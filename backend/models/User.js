const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
        maxLength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [6, 'Password must be at least 6 characters']
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'instructor'],
        default: 'user'
    },
    avatar: {
        type: String,
        default: 'default-avatar.png'
    },
    title: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        maxLength: [500, 'Bio cannot be more than 500 characters']
    },
    skills: [{
        name: {
            type: String,
            required: true
        },
        proficiency: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        }
    }],
    certifications: [{
        name: {
            type: String,
            required: true
        },
        issuer: String,
        date: Date,
        score: Number
    }],
    courses: [{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        progress: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['enrolled', 'in-progress', 'completed'],
            default: 'enrolled'
        },
        enrolledAt: {
            type: Date,
            default: Date.now
        }
    }],
    activities: [{
        type: {
            type: String,
            enum: ['post', 'comment', 'like', 'enroll', 'complete'],
            required: true
        },
        content: String,
        timestamp: {
            type: Date,
            default: Date.now
        },
        reference: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'activities.referenceModel'
        },
        referenceModel: {
            type: String,
            enum: ['Course', 'Post', 'Comment']
        }
    }],
    statistics: {
        totalCoursesCompleted: {
            type: Number,
            default: 0
        },
        averageRating: {
            type: Number,
            default: 0
        },
        projectsCompleted: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10);
        // Hash password
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Match password
userSchema.methods.matchPassword = async function(enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;
