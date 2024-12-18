const User = require('../models/User');
const Course = require('../models/Course');

// @desc    Get analytics dashboard data
// @route   GET /api/analytics/dashboard
// @access  Private
exports.getDashboardAnalytics = async (req, res) => {
    try {
        // Get user's courses and activities
        const user = await User.findById(req.user.id)
            .populate('enrolledCourses')
            .select('-password');

        // Calculate analytics data
        const analyticsData = {
            coursesEnrolled: user.enrolledCourses.length,
            completedCourses: user.enrolledCourses.filter(course => course.completed).length,
            averageScore: calculateAverageScore(user.enrolledCourses),
            recentActivity: await getRecentActivity(user.id),
            progressData: await getProgressData(user.id),
            activityBreakdown: await getActivityBreakdown(user.id)
        };

        res.json(analyticsData);
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ 
            message: error.message || 'Error fetching analytics data'
        });
    }
};

// Helper functions
const calculateAverageScore = (courses) => {
    if (!courses.length) return 0;
    
    const totalScore = courses.reduce((sum, course) => {
        return sum + (course.score || 0);
    }, 0);
    
    return Math.round(totalScore / courses.length);
};

const getRecentActivity = async (userId) => {
    // This would typically query your activity logs
    // For now, returning mock data
    return [
        {
            type: 'quiz',
            title: 'JavaScript Basics',
            score: 90,
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        },
        {
            type: 'video',
            title: 'React Components',
            duration: 45,
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        },
        {
            type: 'assignment',
            title: 'API Integration',
            status: 'Under Review',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        }
    ];
};

const getProgressData = async (userId) => {
    // This would typically calculate actual progress over time
    // For now, returning mock data
    return {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [25, 45, 70, 85]
    };
};

const getActivityBreakdown = async (userId) => {
    // This would typically calculate actual activity breakdown
    // For now, returning mock data
    return {
        labels: ['Assignments', 'Quizzes', 'Videos', 'Reading'],
        data: [65, 80, 45, 90]
    };
};
