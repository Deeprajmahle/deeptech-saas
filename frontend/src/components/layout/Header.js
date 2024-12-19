import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bars3Icon } from '@heroicons/react/24/outline';

const Header = ({ onMenuClick }) => {
    const { user, logout } = useAuth();

    return (
        <header className="fixed w-full bg-white dark:bg-gray-800 shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <button
                            onClick={onMenuClick}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
                        >
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                        
                        <Link to="/dashboard" className="flex items-center ml-2 lg:ml-0">
                            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                                DeepTech
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-4">
                        <Link
                            to="/dashboard"
                            className="text-gray-600 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/courses"
                            className="text-gray-600 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium"
                        >
                            Courses
                        </Link>
                        <Link
                            to="/dashboard"
                            className="text-gray-600 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium"
                        >
                            Resources
                        </Link>
                        <Link
                            to="/dashboard"
                            className="text-gray-600 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium"
                        >
                            Community
                        </Link>
                        <Link
                            to="/analytics"
                            className="text-gray-600 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium"
                        >
                            Analytics
                        </Link>
                    </nav>

                    {/* User Menu */}
                    <div className="flex items-center">
                        <div className="hidden sm:flex items-center">
                            <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">
                                {user?.name}
                            </span>
                        </div>
                        <button
                            onClick={logout}
                            className="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
