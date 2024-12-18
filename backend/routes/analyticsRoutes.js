const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getDashboardAnalytics } = require('../controllers/analyticsController');

router.get('/dashboard', protect, getDashboardAnalytics);

module.exports = router;
