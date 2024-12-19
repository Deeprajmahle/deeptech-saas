import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    HomeIcon, 
    ChartBarIcon, 
    Cog6ToothIcon as CogIcon, 
    BookOpenIcon,
    UserGroupIcon,
    DocumentTextIcon,
    Bars3Icon as MenuIcon,
    XMarkIcon as XIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Courses', href: '/courses', icon: BookOpenIcon },
        { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
        { name: 'Community', href: '/community', icon: UserGroupIcon },
        { name: 'Resources', href: '/resources', icon: DocumentTextIcon },
        { name: 'Settings', href: '/settings', icon: CogIcon },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Mobile menu button */}
            <div className="lg:hidden fixed bottom-4 right-4 z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isMobileMenuOpen ? (
                        <XIcon className="h-6 w-6" />
                    ) : (
                        <MenuIcon className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Sidebar for desktop */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <div className="flex flex-col h-0 flex-1 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <nav className="mt-5 flex-1 px-2 space-y-1">
                                {navigation.map((item) => {
                                    const isCurrentPath = isActive(item.href);
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={`${
                                                isCurrentPath
                                                    ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200'
                                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                            } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150`}
                                        >
                                            <item.icon
                                                className={`${
                                                    isCurrentPath
                                                        ? 'text-indigo-600 dark:text-indigo-200'
                                                        : 'text-gray-400 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                                                } mr-3 flex-shrink-0 h-6 w-6 transition-colors duration-150`}
                                            />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } fixed inset-0 z-40 lg:hidden transition-transform duration-300 ease-in-out`}
            >
                <div className="relative flex flex-col w-full max-w-xs h-full bg-white dark:bg-gray-800 shadow-xl">
                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <nav className="mt-5 px-2 space-y-1">
                            {navigation.map((item) => {
                                const isCurrentPath = isActive(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`${
                                            isCurrentPath
                                                ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        } group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-150`}
                                    >
                                        <item.icon
                                            className={`${
                                                isCurrentPath
                                                    ? 'text-indigo-600 dark:text-indigo-200'
                                                    : 'text-gray-400 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                                            } mr-4 flex-shrink-0 h-6 w-6 transition-colors duration-150`}
                                        />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
                {/* Overlay */}
                <div
                    className="flex-shrink-0 w-14"
                    aria-hidden="true"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {/* Dummy element to force sidebar to shrink to fit close icon */}
                </div>
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-75"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            </div>
        </>
    );
};

export default Sidebar;
