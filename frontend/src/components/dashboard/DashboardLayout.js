import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/responsive.css';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        )},
        { name: 'Courses', href: '/courses', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        )},
        { name: 'Analytics', href: '/dashboard/analytics', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        )},
        { name: 'Settings', href: '/dashboard/settings', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        )}
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile menu button */}
            <button
                className="mobile-menu-button fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-lg"
                onClick={toggleSidebar}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sidebar */}
            <div className={`sidebar bg-white shadow-xl ${sidebarOpen ? 'open' : ''}`}>
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <img className="h-8 w-auto" src="/logo.png" alt="Logo" />
                    </div>
                    <nav className="mt-5 flex-1 px-2 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`${
                                    location.pathname === item.href
                                        ? 'bg-indigo-800 text-white'
                                        : 'text-indigo-100 hover:bg-indigo-700'
                                } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-150 ease-in-out`}
                            >
                                <span className="text-indigo-300 group-hover:text-indigo-100 transition-colors duration-150 ease-in-out">
                                    {item.icon}
                                </span>
                                <span className="ml-3">{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-indigo-800 p-4">
                    <div className="flex items-center">
                        <div className="relative">
                            <img 
                                className="inline-block h-10 w-10 rounded-full ring-2 ring-indigo-300" 
                                src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`} 
                                alt="" 
                            />
                            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-indigo-600 bg-green-400"></span>
                        </div>
                        <div className="ml-3">
                            <p className="text-base font-medium text-white">{user?.name}</p>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium text-indigo-200 hover:text-white transition-colors duration-150 ease-in-out"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content flex-1 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg shadow-xl p-6">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default DashboardLayout;
