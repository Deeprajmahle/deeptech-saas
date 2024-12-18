import React, { useState, useEffect, useRef } from 'react';
import api from '../../config/api';
import { useAuth } from '../../context/AuthContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    
    // Add refs for charts
    const lineChartRef = useRef(null);
    const barChartRef = useRef(null);

    useEffect(() => {
        fetchAnalyticsData();

        // Cleanup function to destroy charts
        return () => {
            if (lineChartRef.current) {
                lineChartRef.current.destroy();
            }
            if (barChartRef.current) {
                barChartRef.current.destroy();
            }
        };
    }, []);

    const fetchAnalyticsData = async () => {
        try {
            const response = await api.get('/api/analytics/dashboard');
            setAnalyticsData(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching analytics:', err);
            setError('Failed to load analytics data');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    const courseProgressData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Course Progress',
                data: [25, 45, 70, 85],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            },
        ],
    };

    const activityData = {
        labels: ['Assignments', 'Quizzes', 'Videos', 'Reading'],
        datasets: [
            {
                label: 'Activity Completion',
                data: [65, 80, 45, 90],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
            
            {/* User Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-indigo-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-indigo-700">Courses Enrolled</h3>
                        <p className="text-3xl font-bold text-indigo-900">5</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-green-700">Completed Courses</h3>
                        <p className="text-3xl font-bold text-green-900">2</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-purple-700">Average Score</h3>
                        <p className="text-3xl font-bold text-purple-900">85%</p>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
                    <div className="h-[300px]">
                        <Line 
                            data={courseProgressData}
                            options={chartOptions}
                        />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Activity Breakdown</h2>
                    <div className="h-[300px]">
                        <Bar 
                            data={activityData}
                            options={chartOptions}
                        />
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b">
                        <div>
                            <p className="font-medium">Completed Quiz: JavaScript Basics</p>
                            <p className="text-sm text-gray-500">Score: 90%</p>
                        </div>
                        <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                        <div>
                            <p className="font-medium">Watched: React Components</p>
                            <p className="text-sm text-gray-500">Duration: 45 minutes</p>
                        </div>
                        <span className="text-sm text-gray-500">3 days ago</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <p className="font-medium">Submitted Assignment: API Integration</p>
                            <p className="text-sm text-gray-500">Status: Under Review</p>
                        </div>
                        <span className="text-sm text-gray-500">5 days ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
