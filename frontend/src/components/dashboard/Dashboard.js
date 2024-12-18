import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from './DashboardLayout';

// Sample course images - Replace these with your actual course images
const COURSE_IMAGES = {
    python: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=500',
    web: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=500',
    data: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500'
};

const Dashboard = () => {
    const { user } = useAuth();

    // Sample featured courses - Replace with actual data from your API
    const featuredCourses = [
        {
            id: 1,
            title: 'Python Programming',
            instructor: 'John Doe',
            image: COURSE_IMAGES.python,
            progress: 75,
            category: 'Programming'
        },
        {
            id: 2,
            title: 'Web Development',
            instructor: 'Jane Smith',
            image: COURSE_IMAGES.web,
            progress: 45,
            category: 'Development'
        },
        {
            id: 3,
            title: 'Data Science',
            instructor: 'Mike Johnson',
            image: COURSE_IMAGES.data,
            progress: 30,
            category: 'Data Science'
        }
    ];

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                {/* User Welcome Section with Avatar */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-5 md:p-6 mb-6">
                    <div className="flex items-center">
                        <img
                            src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random`}
                            alt="Profile"
                            className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-4 border-gray-100"
                        />
                        <div className="ml-4 sm:ml-6">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
                                Welcome back, {user?.name}!
                            </h1>
                            <p className="mt-1 text-sm sm:text-base text-gray-500">
                                Continue your learning journey
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                    {/* Course Progress */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-4 sm:p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                <div className="ml-4 sm:ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm sm:text-base font-medium text-gray-500 truncate">Course Progress</dt>
                                        <dd className="flex items-baseline">
                                            <div className="text-xl sm:text-2xl font-semibold text-gray-900">75%</div>
                                            <div className="ml-2 flex items-baseline text-xs sm:text-sm font-semibold text-green-600">
                                                <svg className="self-center flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="sr-only">Increased by</span>
                                                25%
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Courses */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-4 sm:p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div className="ml-4 sm:ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm sm:text-base font-medium text-gray-500 truncate">Active Courses</dt>
                                        <dd className="flex items-baseline">
                                            <div className="text-xl sm:text-2xl font-semibold text-gray-900">3</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Completed Courses */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-4 sm:p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4 sm:ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm sm:text-base font-medium text-gray-500 truncate">Completed Courses</dt>
                                        <dd className="flex items-baseline">
                                            <div className="text-xl sm:text-2xl font-semibold text-gray-900">5</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Courses */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-5 md:p-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900 mb-4">Featured Courses</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {featuredCourses.map(course => (
                            <div key={course.id} className="group relative">
                                <div className="relative w-full h-48 rounded-lg overflow-hidden group-hover:opacity-75 transition-opacity">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-sm sm:text-base font-medium text-gray-900">
                                        {course.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        {course.instructor}
                                    </p>
                                    <div className="mt-2">
                                        <div className="relative pt-1">
                                            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                                                <div
                                                    style={{ width: `${course.progress}%` }}
                                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">{course.progress}% Complete</p>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    to={`/courses/${course.id}`}
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Link
                            to="/courses"
                            className="relative block p-4 sm:p-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors duration-200"
                        >
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-base sm:text-lg font-medium text-white">Browse Courses</h3>
                                    <p className="mt-1 text-xs sm:text-sm text-blue-100">Explore our latest courses and start learning</p>
                                </div>
                            </div>
                        </Link>
                        <Link
                            to="/analytics"
                            className="relative block p-4 sm:p-5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-colors duration-200"
                        >
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-base sm:text-lg font-medium text-white">View Analytics</h3>
                                    <p className="mt-1 text-xs sm:text-sm text-purple-100">Track your progress and performance</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
