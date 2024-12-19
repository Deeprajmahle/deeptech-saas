import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    HomeIcon, 
    ChartBarIcon, 
    Cog6ToothIcon as CogIcon, 
    BookOpenIcon,
    UserGroupIcon,
    DocumentTextIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Courses', href: '/courses', icon: BookOpenIcon },
        { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
        { name: 'Community', href: '/dashboard', icon: UserGroupIcon },
        { name: 'Resources', href: '/dashboard', icon: DocumentTextIcon },
        { name: 'Settings', href: '/settings', icon: CogIcon },
    ];

    const isActive = (path) => {
        if (path === '/dashboard') {
            return location.pathname === '/dashboard' || 
                   location.pathname === '/community' || 
                   location.pathname === '/resources';
        }
        return location.pathname === path;
    };

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:static lg:inset-0
                transition-transform duration-300 ease-in-out
            `}>
                <div className="flex h-full flex-col">
                    {/* Mobile close button */}
                    <div className="flex items-center justify-between px-4 py-3 lg:hidden">
                        <div className="text-lg font-semibold text-gray-800 dark:text-white">Menu</div>
                        <button
                            onClick={onClose}
                            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {navigation.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => onClose()}
                                    className={`
                                        group flex items-center px-2 py-2 text-sm font-medium rounded-md
                                        ${active
                                            ? 'bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400'
                                        }
                                    `}
                                >
                                    <item.icon
                                        className={`
                                            mr-3 h-6 w-6 flex-shrink-0
                                            ${active
                                                ? 'text-indigo-600 dark:text-indigo-400'
                                                : 'text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                                            }
                                        `}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
