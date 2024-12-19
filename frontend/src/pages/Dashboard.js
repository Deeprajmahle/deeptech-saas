import React from 'react';
import { 
    UserGroupIcon, 
    ChartBarIcon, 
    CurrencyDollarIcon, 
    DocumentTextIcon 
} from '@heroicons/react/24/outline';

const Dashboard = () => {
    const stats = [
        {
            name: 'Total Students',
            stat: '1,897',
            icon: UserGroupIcon,
            change: '12%',
            changeType: 'increase'
        },
        {
            name: 'Course Completion',
            stat: '83.6%',
            icon: ChartBarIcon,
            change: '2.3%',
            changeType: 'increase'
        },
        {
            name: 'Revenue',
            stat: '$48,574',
            icon: CurrencyDollarIcon,
            change: '4.1%',
            changeType: 'increase'
        },
        {
            name: 'Active Courses',
            stat: '24',
            icon: DocumentTextIcon,
            change: '3',
            changeType: 'increase'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                        Welcome back!
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                        Here's what's happening with your courses today.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Create New Course
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <div
                        key={item.name}
                        className="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <div>
                            <div className="absolute bg-indigo-500 rounded-md p-3">
                                <item.icon
                                    className="h-6 w-6 text-white"
                                    aria-hidden="true"
                                />
                            </div>
                            <p className="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                {item.name}
                            </p>
                        </div>
                        <div className="ml-16 pb-6 flex items-baseline sm:pb-7">
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                {item.stat}
                            </p>
                            <p
                                className={`ml-2 flex items-baseline text-sm font-semibold ${
                                    item.changeType === 'increase'
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                }`}
                            >
                                {item.change}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Recent Activity
                    </h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                                    New course enrollment
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                        Completed
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Student enrolled in "Advanced React Patterns"
                                    </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                                    <p>5 minutes ago</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
