import React from 'react';
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
    // Sample data for line chart
    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Monthly Revenue',
                data: [1200, 1900, 3000, 5000, 2000, 3000],
                fill: true,
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderColor: 'rgb(99, 102, 241)',
                tension: 0.4
            }
        ]
    };

    // Sample data for bar chart
    const barChartData = {
        labels: ['Users', 'Sessions', 'Conversions', 'Sales'],
        datasets: [
            {
                label: 'This Month',
                data: [65, 59, 80, 81],
                backgroundColor: 'rgba(99, 102, 241, 0.7)',
            },
            {
                label: 'Last Month',
                data: [45, 39, 60, 61],
                backgroundColor: 'rgba(99, 102, 241, 0.3)',
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12,
                        family: "'Inter', sans-serif"
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Analytics Overview</h2>
                    <p className="mt-2 text-sm text-gray-600">Track your platform's performance and user engagement</p>
                </div>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">$12,345</dd>
                            <div className="mt-2 flex items-center text-sm">
                                <span className="text-green-600 font-medium flex items-center">
                                    <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    12%
                                </span>
                                <span className="ml-2 text-gray-500">from last month</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">1,234</dd>
                            <div className="mt-2 flex items-center text-sm">
                                <span className="text-green-600 font-medium flex items-center">
                                    <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    5%
                                </span>
                                <span className="ml-2 text-gray-500">from last month</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Conversion Rate</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">2.3%</dd>
                            <div className="mt-2 flex items-center text-sm">
                                <span className="text-red-600 font-medium flex items-center">
                                    <svg className="self-center flex-shrink-0 h-5 w-5 text-red-500 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    1%
                                </span>
                                <span className="ml-2 text-gray-500">from last month</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Avg. Session Duration</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">4m 32s</dd>
                            <div className="mt-2 flex items-center text-sm">
                                <span className="text-green-600 font-medium flex items-center">
                                    <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    8%
                                </span>
                                <span className="ml-2 text-gray-500">from last month</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Overview</h3>
                        <div className="h-[300px] sm:h-[400px]">
                            <Line data={lineChartData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
                        <div className="h-[300px] sm:h-[400px]">
                            <Bar data={barChartData} options={chartOptions} />
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-8 bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                    <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">New User Registration</p>
                                <p className="text-sm text-gray-500">John Doe registered an account</p>
                            </div>
                            <div className="flex-shrink-0 text-sm text-gray-500">2 hours ago</div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">Course Purchase</p>
                                <p className="text-sm text-gray-500">React Masterclass was purchased</p>
                            </div>
                            <div className="flex-shrink-0 text-sm text-gray-500">5 hours ago</div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                                    <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">Course Completion</p>
                                <p className="text-sm text-gray-500">Jane Smith completed JavaScript Basics</p>
                            </div>
                            <div className="flex-shrink-0 text-sm text-gray-500">1 day ago</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
