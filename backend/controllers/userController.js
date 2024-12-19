// backend/controllers/userController.js
const User = require('../models/User');
const Course = require('../models/Course');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Authenticate user
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Get all users with pagination, sorting, and filtering
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sortField = req.query.sortField || 'name';
  const sortOrder = req.query.sortOrder || 'asc';
  const search = req.query.search || '';

  const sortOptions = {};
  sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;

  const query = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { role: { $regex: search, $options: 'i' } }
    ];
  }

  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('-password'),
    User.countDocuments(query)
  ]);

  const totalPages = Math.ceil(total / limit);

  res.json({
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ 
      message: error.message || 'Error retrieving user'
    });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, email, role } = req.body;
    
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ 
      message: error.message || 'Error updating user'
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ 
      message: error.message || 'Error deleting user'
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
        .select('-password')
        .populate('courses', 'title thumbnail progress status');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.json({ success: true, data: user });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    try {
        console.log('Update profile request:', {
            ...req.body,
            currentPassword: req.body.currentPassword ? '[REDACTED]' : undefined,
            newPassword: req.body.newPassword ? '[REDACTED]' : undefined
        });

        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        // Check if email is being changed and if it's already taken
        if (req.body.email && req.body.email !== user.email) {
            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists) {
                res.status(400);
                throw new Error('Email already exists');
            }
        }

        // Validate current password if trying to change password
        if (req.body.newPassword) {
            if (!req.body.currentPassword) {
                res.status(400);
                throw new Error('Current password is required');
            }

            const isMatch = await user.matchPassword(req.body.currentPassword);
            if (!isMatch) {
                res.status(401);
                throw new Error('Current password is incorrect');
            }

            // Hash new password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.newPassword, salt);
        }

        // Update user fields
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // Update notification preferences
        if (req.body.notifications) {
            user.notifications = {
                email: req.body.notifications.email ?? user.notifications?.email ?? true,
                sms: req.body.notifications.sms ?? user.notifications?.sms ?? false,
                push: req.body.notifications.push ?? user.notifications?.push ?? true
            };
        }

        // Save theme preference
        if (req.body.theme) {
            user.theme = req.body.theme;
        }

        const updatedUser = await user.save();
        console.log('User updated successfully:', updatedUser._id);

        res.json({
            success: true,
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                notifications: updatedUser.notifications,
                theme: updatedUser.theme
            }
        });
    } catch (error) {
        console.error('Error in updateProfile:', error);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Error updating profile'
        });
    }
});

// @desc    Update password
// @route   PUT /api/users/password
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user.id);
    
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        res.status(401);
        throw new Error('Current password is incorrect');
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    await user.save();
    res.json({ success: true, message: 'Password updated successfully' });
});

// @desc    Get user's enrolled courses
// @route   GET /api/users/courses
// @access  Private
const getUserCourses = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
        .populate({
            path: 'courses',
            select: 'title description thumbnail category level progress status'
        });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.json({ success: true, data: user.courses });
});

// @desc    Get user's recent activities
// @route   GET /api/users/activities
// @access  Private
const getUserActivities = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
        .populate({
            path: 'activities',
            options: { sort: { createdAt: -1 }, limit: 10 }
        });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.json({ success: true, data: user.activities });
});

// @desc    Export users as CSV
// @route   GET /api/users/export
// @access  Private/Admin
const exportUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password');
    
    // Create CSV header
    const csvHeader = ['Name', 'Email', 'Role', 'Registration Date'].join(',');
    
    // Create CSV rows
    const csvRows = users.map(user => {
        return [
            user.name,
            user.email,
            user.role,
            new Date(user.createdAt).toISOString()
        ].join(',');
    });

    // Combine header and rows
    const csvContent = [csvHeader, ...csvRows].join('\n');

    // Set headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=users.csv');

    res.send(csvContent);
});

module.exports = { 
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile: getProfile,
  updateProfile,
  updatePassword,
  getUserCourses,
  getUserActivities,
  exportUsers
};