// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserProfile,
    updateProfile,
    updatePassword,
    getUserCourses,
    getUserActivities,
    exportUsers
} = require('../controllers/userController');

// Public routes
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateProfile);
router.route('/password').put(protect, updatePassword);

// Admin routes
router.route('/').get(protect, authorize('admin'), getUsers);
router.route('/export').get(protect, authorize('admin'), exportUsers);
router.route('/:id')
    .get(protect, authorize('admin'), getUserById)
    .put(protect, authorize('admin'), updateUser)
    .delete(protect, authorize('admin'), deleteUser);

// User activity routes
router.route('/:id/courses').get(protect, getUserCourses);
router.route('/:id/activities').get(protect, getUserActivities);

module.exports = router;