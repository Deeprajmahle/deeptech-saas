const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    enrollCourse,
    rateCourse,
} = require('../controllers/courseController');

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourse);

// Protected routes
router.use(protect);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.post('/:id/enroll', enrollCourse);
router.post('/:id/rate', rateCourse);

module.exports = router;
