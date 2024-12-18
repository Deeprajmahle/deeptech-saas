const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a course title'],
        trim: true,
        maxLength: [100, 'Course title cannot be more than 100 characters']
    },
    slug: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a course description']
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    thumbnail: {
        type: String,
        default: 'default-course.jpg'
    },
    category: {
        type: String,
        required: [true, 'Please provide a course category'],
        enum: [
            'Web Development',
            'Mobile Development',
            'Data Science',
            'AI/ML',
            'Cloud Computing',
            'DevOps',
            'Cybersecurity',
            'UI/UX',
            'Other'
        ]
    },
    level: {
        type: String,
        required: [true, 'Please specify the course level'],
        enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    duration: {
        type: Number,
        required: [true, 'Please specify the course duration in hours']
    },
    price: {
        type: Number,
        required: [true, 'Please specify the course price'],
        default: 0
    },
    modules: [{
        title: {
            type: String,
            required: true
        },
        description: String,
        duration: Number,
        lessons: [{
            title: {
                type: String,
                required: true
            },
            type: {
                type: String,
                enum: ['video', 'article', 'quiz'],
                required: true
            },
            content: {
                type: String,
                required: true
            },
            duration: Number,
            order: Number
        }]
    }],
    requirements: [{
        type: String
    }],
    objectives: [{
        type: String
    }],
    tags: [{
        type: String
    }],
    ratings: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        review: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    statistics: {
        totalEnrolled: {
            type: Number,
            default: 0
        },
        totalCompleted: {
            type: Number,
            default: 0
        },
        averageRating: {
            type: Number,
            default: 0
        },
        totalRatings: {
            type: Number,
            default: 0
        }
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    featured: {
        type: Boolean,
        default: false
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual field for average rating
courseSchema.virtual('averageRating').get(function() {
    if (this.ratings.length === 0) return 0;
    const sum = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / this.ratings.length).toFixed(1);
});

// Pre-save middleware to generate slug
courseSchema.pre('save', function(next) {
    if (!this.isModified('title')) {
        return next();
    }
    this.slug = this.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    next();
});

// Pre-save middleware to update statistics
courseSchema.pre('save', function(next) {
    if (this.ratings && this.ratings.length > 0) {
        const sum = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
        this.statistics.averageRating = (sum / this.ratings.length).toFixed(1);
        this.statistics.totalRatings = this.ratings.length;
    }
    next();
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
