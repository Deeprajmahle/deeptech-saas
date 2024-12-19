import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';
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
    Legend
);

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        if (!token) {
            console.log('No token found, redirecting to login...');
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                console.log('Starting data fetch...');
                setLoading(true);

                // Fetch analytics data
                console.log('Fetching analytics data...');
                const analyticsResponse = await api.get('/api/analytics/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Analytics response:', analyticsResponse.data);
                setAnalyticsData(analyticsResponse.data);

                // Fetch users data
                console.log('Fetching users data...');
                const usersResponse = await api.get('/api/users', {
                    params: {
                        page: currentPage,
                        limit: itemsPerPage,
                        sortField: sortConfig.key,
                        sortOrder: sortConfig.direction,
                        search: filterText
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Users response:', usersResponse.data);
                setUsers(usersResponse.data.users || []);

                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                console.error('Error details:', {
                    message: err.message,
                    response: err.response?.data,
                    status: err.response?.status
                });
                
                if (err.response?.status === 401) {
                    console.log('Unauthorized, redirecting to login...');
                    setError('Please log in to view analytics');
                    navigate('/login');
                } else {
                    setError(err.message || 'Failed to fetch data');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token, currentPage, sortConfig, filterText, navigate]);

    const handleSort = (key) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
        });
    };

    const exportToCSV = async () => {
        try {
            console.log('Exporting users to CSV...');
            const response = await api.get('/api/users/export', {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Export response:', response.data);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'users.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error exporting users:', error);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-full">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    if (!analyticsData) {
        return <div className="text-center">No analytics data available</div>;
    }

    // Revenue chart data
    const revenueChartData = {
        labels: analyticsData?.monthlyRevenue?.map(item => item.month) || [],
        datasets: [
            {
                label: 'Monthly Revenue',
                data: analyticsData?.monthlyRevenue?.map(item => item.revenue) || [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    // Performance metrics chart data
    const performanceChartData = {
        labels: ['Users', 'Sessions', 'Conversions', 'Sales'],
        datasets: [
            {
                label: 'Current Month',
                data: [
                    analyticsData?.performanceMetrics?.currentMonth?.users || 0,
                    analyticsData?.performanceMetrics?.currentMonth?.sessions || 0,
                    analyticsData?.performanceMetrics?.currentMonth?.conversions || 0,
                    analyticsData?.performanceMetrics?.currentMonth?.sales || 0,
                ],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Last Month',
                data: [
                    analyticsData?.performanceMetrics?.lastMonth?.users || 0,
                    analyticsData?.performanceMetrics?.lastMonth?.sessions || 0,
                    analyticsData?.performanceMetrics?.lastMonth?.conversions || 0,
                    analyticsData?.performanceMetrics?.lastMonth?.sales || 0,
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Analytics Overview</h1>
                <p className="text-gray-600">Track your platform's performance and user engagement</p>
            </div>

            {/* Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Total Revenue Card */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                    <div className="mt-2 flex items-baseline">
                        <p className="text-2xl font-semibold">${analyticsData?.overview?.totalRevenue}</p>
                        <span className={`ml-2 text-sm ${analyticsData?.overview?.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {analyticsData?.overview?.revenueGrowth >= 0 ? '+' : ''}{analyticsData?.overview?.revenueGrowth?.toFixed(1)}%
                        </span>
                    </div>
                </div>

                {/* Active Users Card */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Active Users</h3>
                    <div className="mt-2 flex items-baseline">
                        <p className="text-2xl font-semibold">{analyticsData?.overview?.activeUsers}</p>
                        <span className={`ml-2 text-sm ${analyticsData?.overview?.userGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {analyticsData?.overview?.userGrowth >= 0 ? '+' : ''}{analyticsData?.overview?.userGrowth?.toFixed(1)}%
                        </span>
                    </div>
                </div>

                {/* Conversion Rate Card */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Conversion Rate</h3>
                    <div className="mt-2 flex items-baseline">
                        <p className="text-2xl font-semibold">{analyticsData?.overview?.conversionRate}%</p>
                        <span className={`ml-2 text-sm ${analyticsData?.overview?.conversionChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {analyticsData?.overview?.conversionChange >= 0 ? '+' : ''}{analyticsData?.overview?.conversionChange?.toFixed(1)}%
                        </span>
                    </div>
                </div>

                {/* Avg Session Duration Card */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm font-medium">Avg. Session Duration</h3>
                    <div className="mt-2 flex items-baseline">
                        <p className="text-2xl font-semibold">{analyticsData?.overview?.avgSessionDuration}</p>
                        <span className={`ml-2 text-sm ${analyticsData?.overview?.sessionGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {analyticsData?.overview?.sessionGrowth >= 0 ? '+' : ''}{analyticsData?.overview?.sessionGrowth?.toFixed(1)}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Revenue Chart */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-4">Revenue Overview</h3>
                    <Line data={revenueChartData} options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                        },
                    }} />
                </div>

                {/* Performance Metrics Chart */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
                    <Bar data={performanceChartData} options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                        },
                    }} />
                </div>
            </div>

            {/* User Management Table */}
            <div className="bg-white rounded-lg shadow mt-8">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                    <button
                        onClick={exportToCSV}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Export to CSV
                    </button>
                </div>

                <div className="px-4 py-3 border-b border-gray-200">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {['Name', 'Email', 'Role', 'Registration Date'].map((header) => (
                                    <th
                                        key={header}
                                        onClick={() => handleSort(header.toLowerCase())}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                    >
                                        <div className="flex items-center">
                                            {header}
                                            {sortConfig.key === header.toLowerCase() && (
                                                <span className="ml-2">
                                                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(page => page + 1)}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing page <span className="font-medium">{currentPage}</span>
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <button
                                    onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(page => page + 1)}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
