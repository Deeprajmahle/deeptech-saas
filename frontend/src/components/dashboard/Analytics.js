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
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
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
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
            {
                label: 'Last Month',
                data: [45, 39, 60, 61],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                    <p className="text-3xl font-bold">$12,345</p>
                    <span className="text-green-500">+12% from last month</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Active Users</h3>
                    <p className="text-3xl font-bold">1,234</p>
                    <span className="text-green-500">+5% from last month</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Conversion Rate</h3>
                    <p className="text-3xl font-bold">2.3%</p>
                    <span className="text-red-500">-1% from last month</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Avg. Session Duration</h3>
                    <p className="text-3xl font-bold">4m 32s</p>
                    <span className="text-green-500">+8% from last month</span>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4">Revenue Overview</h3>
                    <div className="h-[300px]">
                        <Line data={lineChartData} options={chartOptions} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
                    <div className="h-[300px]">
                        <Bar data={barChartData} options={chartOptions} />
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <div>
                            <p className="font-medium">New User Registration</p>
                            <p className="text-sm text-gray-500">John Doe registered an account</p>
                        </div>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                        <div>
                            <p className="font-medium">Course Purchase</p>
                            <p className="text-sm text-gray-500">React Masterclass was purchased</p>
                        </div>
                        <span className="text-sm text-gray-500">5 hours ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium">Course Completion</p>
                            <p className="text-sm text-gray-500">Jane Smith completed JavaScript Basics</p>
                        </div>
                        <span className="text-sm text-gray-500">1 day ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
