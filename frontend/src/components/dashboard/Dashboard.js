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
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
                    <p className="text-gray-600">{user.title || 'IT Specialist'}</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="text-xl font-semibold">{user.name}</p>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                    <img
                        src={user.avatar || 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className="w-16 h-16 rounded-full"
                    />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Overall Rating</h3>
                    <p className="text-3xl font-bold">{user.statistics?.averageRating || '8.2'}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Completed Projects</h3>
                    <p className="text-3xl font-bold">{user.statistics?.projectsCompleted || '75'}%</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Proficient Skills</h3>
                    <p className="text-3xl font-bold">{user.skills?.length || '10'}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Courses Completed</h3>
                    <p className="text-3xl font-bold">{user.statistics?.totalCoursesCompleted || '0'}</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Progress Chart */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
                        <Line data={progressData} />
                    </div>

                    {/* Current Courses */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Current Courses</h2>
                        <div className="space-y-4">
                            {courses.slice(0, 3).map((course) => (
                                <div key={course._id} className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">{course.title}</h3>
                                        <p className="text-sm text-gray-500">{course.category}</p>
                                    </div>
                                    <div className="w-32">
                                        <div className="h-2 bg-gray-200 rounded">
                                            <div
                                                className="h-2 bg-indigo-500 rounded"
                                                style={{ width: `${course.progress || 0}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Skills</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {(user.skills || []).map((skill, index) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">{skill.name}</span>
                                        <span className="text-sm text-gray-500">{skill.proficiency}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded">
                                        <div
                                            className="h-2 bg-indigo-500 rounded"
                                            style={{ width: `${skill.proficiency}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Calendar */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                            className="w-full"
                        />
                    </div>

                    {/* Recent Activities */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
                        <div className="space-y-4">
                            {(user.activities || []).slice(0, 5).map((activity, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <i className="fas fa-check text-indigo-500"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm">{activity.content}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(activity.timestamp).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Certifications</h2>
                        <div className="space-y-4">
                            {(user.certifications || []).map((cert, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                            <i className="fas fa-certificate text-yellow-500"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-medium">{cert.name}</p>
                                        <p className="text-sm text-gray-500">{cert.issuer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
