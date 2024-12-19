import React from 'react';
import { 
    ClockIcon, 
    UserGroupIcon, 
    StarIcon,
    PlayIcon
} from '@heroicons/react/24/outline';

const Courses = () => {
    const courses = [
        {
            id: 1,
            title: 'Advanced React Patterns',
            description: 'Learn advanced React patterns and best practices for building scalable applications.',
            duration: '6 hours',
            students: 1234,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
            instructor: 'Sarah Johnson',
            level: 'Advanced'
        },
        {
            id: 2,
            title: 'Node.js Microservices',
            description: 'Master building scalable microservices architecture with Node.js and Docker.',
            duration: '8 hours',
            students: 892,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
            instructor: 'Michael Chen',
            level: 'Intermediate'
        },
        {
            id: 3,
            title: 'Full-Stack Development',
            description: 'Complete guide to modern full-stack development with React and Node.js.',
            duration: '12 hours',
            students: 2156,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
            instructor: 'Emma Davis',
            level: 'Beginner'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                        Courses
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                        Explore our collection of expert-led courses
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <div className="relative rounded-md shadow-sm">
                        <input
                            type="text"
                            className="block w-full rounded-md border-gray-300 dark:border-gray-600 pl-4 pr-12 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                            placeholder="Search courses..."
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg
                                className="h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="relative">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="h-48 w-full object-cover rounded-t-lg"
                            />
                            <div className="absolute top-2 right-2 px-2 py-1 bg-white dark:bg-gray-800 rounded text-sm font-medium">
                                {course.level}
                            </div>
                        </div>
                        <div className="flex-1 p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {course.title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                {course.description}
                            </p>
                            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                    <ClockIcon className="h-5 w-5 mr-1" />
                                    {course.duration}
                                </div>
                                <div className="flex items-center">
                                    <UserGroupIcon className="h-5 w-5 mr-1" />
                                    {course.students}
                                </div>
                                <div className="flex items-center">
                                    <StarIcon className="h-5 w-5 mr-1 text-yellow-400" />
                                    {course.rating}
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {course.instructor}
                                </div>
                                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <PlayIcon className="h-5 w-5 mr-1" />
                                    Start Course
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                        Previous
                    </button>
                    <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            Showing <span className="font-medium">1</span> to{' '}
                            <span className="font-medium">10</span> of{' '}
                            <span className="font-medium">20</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                                Previous
                            </button>
                            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                                1
                            </button>
                            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                                2
                            </button>
                            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                                Next
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courses;
