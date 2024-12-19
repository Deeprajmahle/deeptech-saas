const User = require('../models/User');
const Course = require('../models/Course');

// @desc    Get analytics dashboard data
// @route   GET /api/analytics/dashboard
// @access  Private
exports.getDashboardAnalytics = async (req, res) => {
    try {
        // Get current date and last month's date
        const currentDate = new Date();
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

        // Get all users
        const users = await User.find({});
        const lastMonthUsers = await User.find({ createdAt: { $lt: currentDate, $gte: lastMonth } });

        // Calculate user growth
        const userGrowth = ((users.length - lastMonthUsers.length) / lastMonthUsers.length) * 100;

        // Mock revenue data (replace with actual revenue calculation)
        const totalRevenue = 12345;
        const lastMonthRevenue = 11000;
        const revenueGrowth = ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;

        // Mock conversion data (replace with actual conversion calculation)
        const conversions = 234;
        const lastMonthConversions = 236;
        const conversionRate = 2.3;
        const conversionChange = ((conversions - lastMonthConversions) / lastMonthConversions) * 100;

        // Mock session data (replace with actual session calculation)
        const avgSessionDuration = '4m 32s';
        const lastMonthSessionDuration = '4m 10s';
        const sessionGrowth = 8;

        // Monthly revenue data
        const monthlyRevenue = [
            { month: 'January', revenue: 1200 },
            { month: 'February', revenue: 1900 },
            { month: 'March', revenue: 3000 },
            { month: 'April', revenue: 4800 },
            { month: 'May', revenue: 2000 },
            { month: 'June', revenue: 3000 }
        ];

        // Performance metrics
        const performanceMetrics = {
            currentMonth: {
                users: 65,
                sessions: 59,
                conversions: 80,
                sales: 81
            },
            lastMonth: {
                users: 45,
                sessions: 39,
                conversions: 60,
                sales: 61
            }
        };

        // Recent activity
        const recentActivity = await getRecentActivity(req.user.id);

        const analyticsData = {
            overview: {
                totalRevenue,
                activeUsers: users.length,
                conversionRate,
                avgSessionDuration,
                revenueGrowth,
                userGrowth,
                conversionChange,
                sessionGrowth
            },
            monthlyRevenue,
            performanceMetrics,
            recentActivity
        };

        res.json(analyticsData);
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ 
            message: error.message || 'Error fetching analytics data'
        });
    }
};

// Helper function to get recent activity
const getRecentActivity = async (userId) => {
    // Mock recent activity data
    return [
        {
            type: 'registration',
            title: 'New User Registration',
            description: 'John Doe registered an account',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
        },
        {
            type: 'purchase',
            title: 'Course Purchase',
            description: 'React Masterclass was purchased',
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
        },
        {
            type: 'completion',
            title: 'Course Completion',
            description: 'Jane Smith completed JavaScript Basics',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
        }
    ];
};
