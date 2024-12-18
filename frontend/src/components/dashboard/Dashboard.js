import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [activities, setActivities] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [coursesRes] = await Promise.all([
                    api.get('/api/courses'),
                ]);
                setCourses(coursesRes.data.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const progressData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Course Progress',
                data: [30, 45, 60, 70, 85, 100],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Dashboard</h1>
                    <p className="text-sm sm:text-base text-gray-600">{user.title || 'IT Specialist'}</p>
                </div>
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <div className="text-left sm:text-right flex-grow sm:flex-grow-0">
                        <p className="text-lg sm:text-xl font-semibold truncate">{user.name}</p>
                        <p className="text-sm text-gray-600 truncate">{user.email}</p>
                    </div>
                    <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                        alt="Profile"
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex-shrink-0"
                    />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Overall Rating</h3>
                    <p className="text-2xl sm:text-3xl font-bold">{user.statistics?.averageRating || '8.2'}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Completed Projects</h3>
                    <p className="text-2xl sm:text-3xl font-bold">{user.statistics?.completedProjects || '12'}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Active Courses</h3>
                    <p className="text-2xl sm:text-3xl font-bold">{courses.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Hours Spent</h3>
                    <p className="text-2xl sm:text-3xl font-bold">{user.statistics?.hoursSpent || '156'}</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Progress Chart */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">Learning Progress</h2>
                    <div className="h-64 sm:h-80">
                        <Line 
                            data={progressData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        max: 100,
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Calendar */}
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">Schedule</h2>
                    <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                        className="w-full border-0 shadow-none"
                    />
                </div>

                {/* Recent Courses */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">Recent Courses</h2>
                    <div className="space-y-4">
                        {courses.slice(0, 3).map((course, index) => (
                            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                <div className="flex-shrink-0">
                                    <img
                                        src={course.thumbnail || 'https://via.placeholder.com/150'}
                                        alt={course.title}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                </div>
                                <div className="flex-grow min-w-0">
                                    <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">{course.title}</h3>
                                    <p className="text-sm text-gray-500 truncate">{course.instructor}</p>
                                    <div className="mt-1 relative pt-1">
                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                                            <div
                                                style={{ width: `${course.progress || 0}%` }}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 text-sm text-gray-500">
                                    {course.progress || 0}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {activities.map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm text-gray-900">{activity.description}</p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
