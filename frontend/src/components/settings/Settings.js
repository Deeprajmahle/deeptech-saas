import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/api';

const Settings = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [notifications, setNotifications] = useState({
        email: user?.notifications?.email ?? true,
        push: user?.notifications?.push ?? false,
        marketing: user?.notifications?.marketing ?? true
    });
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [message, setMessage] = useState({ type: '', content: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || prev.name,
                email: user.email || prev.email
            }));
            setNotifications(prev => ({
                ...prev,
                email: user.notifications?.email ?? prev.email,
                push: user.notifications?.push ?? prev.push,
                marketing: user.notifications?.marketing ?? prev.marketing
            }));
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotifications(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleThemeChange = (e) => {
        const newTheme = e.target.value;
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const validateForm = () => {
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: 'error', content: 'New passwords do not match' });
            return false;
        }

        if (formData.newPassword && !formData.currentPassword) {
            setMessage({ type: 'error', content: 'Please enter your current password' });
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setMessage({ type: 'error', content: 'Please enter a valid email address' });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setMessage({ type: '', content: '' });

        try {
            const response = await api.put('/api/users/profile', {
                name: formData.name,
                email: formData.email,
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
                notifications,
                theme
            });

            if (response.data.success) {
                updateUser(response.data.user);
                setMessage({ type: 'success', content: 'Settings updated successfully!' });
                setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }));
            }
        } catch (error) {
            console.error('Error updating settings:', error);
            setMessage({
                type: 'error',
                content: error.response?.data?.message || 'Failed to update settings'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Settings
            </h1>

            {message.content && (
                <div className={`mb-6 p-4 rounded-md ${
                    message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                    <p className="text-sm sm:text-base">{message.content}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Profile Section */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sm:p-8">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-6">
                        Profile Information
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                            />
                        </div>
                    </div>
                </div>

                {/* Password Section */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sm:p-8">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-6">
                        Change Password
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                                Current Password
                            </label>
                            <input
                                type="password"
                                name="currentPassword"
                                id="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                            />
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                            />
                        </div>
                    </div>
                </div>

                {/* Theme Section */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sm:p-8">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-6">
                        Theme Preferences
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Color Theme
                            </label>
                            <select
                                value={theme}
                                onChange={handleThemeChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-sm sm:text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sm:p-8">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-6">
                        Notification Settings
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="email"
                                id="email-notifications"
                                checked={notifications.email}
                                onChange={handleNotificationChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="email-notifications" className="ml-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                                Email Notifications
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="push"
                                id="push-notifications"
                                checked={notifications.push}
                                onChange={handleNotificationChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="push-notifications" className="ml-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                                Push Notifications
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="marketing"
                                id="marketing-notifications"
                                checked={notifications.marketing}
                                onChange={handleNotificationChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="marketing-notifications" className="ml-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                                Marketing Notifications
                            </label>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm sm:text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;
