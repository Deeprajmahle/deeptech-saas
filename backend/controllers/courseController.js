const Course = require('../models/Course');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (Instructor only)
exports.createCourse = asyncHandler(async (req, res) => {
    req.body.instructor = req.user.id;
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
});

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res) => {
    const { category, level, search, sort, page = 1, limit = 10 } = req.query;
    const query = {};

    // Filter by category
    if (category) {
        query.category = category;
    }

    // Filter by level
    if (level) {
        query.level = level;
    }

    // Search by title or description
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    // Only show published courses for non-admin users
    if (!req.user || req.user.role !== 'admin') {
        query.status = 'published';
    }

    // Build sort object
    let sortObj = {};
    if (sort) {
        const sortFields = sort.split(',').reduce((acc, field) => {
            const [key, order] = field.split(':');
            acc[key] = order === 'desc' ? -1 : 1;
            return acc;
        }, {});
        sortObj = sortFields;
    } else {
        sortObj = { createdAt: -1 };
    }

    const courses = await Course.find(query)
        .populate('instructor', 'name avatar')
        .sort(sortObj)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

    const total = await Course.countDocuments(query);

    res.status(200).json({
        success: true,
        data: courses,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit)
        }
    });
});

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
exports.getCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id)
        .populate('instructor', 'name avatar bio title')
        .populate('ratings.user', 'name avatar');

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    res.status(200).json({ success: true, data: course });
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Instructor only)
exports.updateCourse = asyncHandler(async (req, res) => {
    let course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    // Make sure user is course instructor or admin
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized to update this course');
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: course });
});

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Instructor only)
exports.deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    // Make sure user is course instructor or admin
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized to delete this course');
    }

    await course.remove();

    res.status(200).json({ success: true, data: {} });
});

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Private
exports.enrollCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    // Check if user is already enrolled
    const user = await User.findById(req.user.id);
    const isEnrolled = user.courses.some(c => c.courseId.toString() === req.params.id);

    if (isEnrolled) {
        res.status(400);
        throw new Error('Already enrolled in this course');
    }

    // Add course to user's courses
    user.courses.push({
        courseId: course._id,
        status: 'enrolled'
    });

    // Update course statistics
    course.statistics.totalEnrolled += 1;

    // Add activity
    user.activities.push({
        type: 'enroll',
        content: `Enrolled in ${course.title}`,
        reference: course._id,
        referenceModel: 'Course'
    });

    await user.save();
    await course.save();

    res.status(200).json({ success: true, data: {} });
});

// @desc    Rate course
// @route   POST /api/courses/:id/ratings
// @access  Private
exports.rateCourse = asyncHandler(async (req, res) => {
    const { rating, review } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    // Check if user has completed the course
    const user = await User.findById(req.user.id);
    const userCourse = user.courses.find(c => c.courseId.toString() === req.params.id);

    if (!userCourse || userCourse.status !== 'completed') {
        res.status(400);
        throw new Error('You must complete the course before rating it');
    }

    // Check if user has already rated
    const existingRating = course.ratings.find(r => r.user.toString() === req.user.id);

    if (existingRating) {
        // Update existing rating
        existingRating.rating = rating;
        existingRating.review = review;
        existingRating.date = Date.now();
    } else {
        // Add new rating
        course.ratings.push({
            user: req.user.id,
            rating,
            review
        });
    }

    await course.save();

    res.status(200).json({ success: true, data: course });
});

// @desc    Update course progress
// @route   PUT /api/courses/:id/progress
// @access  Private
exports.updateProgress = asyncHandler(async (req, res) => {
    const { progress } = req.body;
    const user = await User.findById(req.user.id);
    const courseIndex = user.courses.findIndex(c => c.courseId.toString() === req.params.id);

    if (courseIndex === -1) {
        res.status(404);
        throw new Error('Course not found in user\'s enrolled courses');
    }

    user.courses[courseIndex].progress = progress;

    // Update status based on progress
    if (progress === 100) {
        user.courses[courseIndex].status = 'completed';
        user.statistics.totalCoursesCompleted += 1;

        // Add completion activity
        user.activities.push({
            type: 'complete',
            content: `Completed the course`,
            reference: req.params.id,
            referenceModel: 'Course'
        });

        // Update course statistics
        const course = await Course.findById(req.params.id);
        course.statistics.totalCompleted += 1;
        await course.save();
    } else if (progress > 0) {
        user.courses[courseIndex].status = 'in-progress';
    }

    await user.save();

    res.status(200).json({ success: true, data: user.courses[courseIndex] });
});
