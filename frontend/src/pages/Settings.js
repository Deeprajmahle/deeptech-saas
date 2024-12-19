import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

const Settings = () => {
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        marketing: true
    });

    const [darkMode, setDarkMode] = useState(
        document.documentElement.classList.contains('dark')
    );

    const toggleDarkMode = () => {
        const isDark = !darkMode;
        setDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    };

    return (
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            {/* Profile Settings */}
            <section aria-labelledby="profile-settings-heading">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white dark:bg-gray-800 py-6 px-4 sm:p-6">
                        <div>
                            <h2
                                id="profile-settings-heading"
                                className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                            >
                                Profile
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Update your profile information and preferences.
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    First name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Last name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save Profile
                        </button>
                    </div>
                </div>
            </section>

            {/* Appearance Settings */}
            <section aria-labelledby="appearance-settings-heading">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white dark:bg-gray-800 py-6 px-4 sm:p-6">
                        <div>
                            <h2
                                id="appearance-settings-heading"
                                className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                            >
                                Appearance
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Customize the appearance of the application.
                            </p>
                        </div>

                        <div className="mt-6">
                            <Switch.Group as="div" className="flex items-center justify-between">
                                <Switch.Label as="span" className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        Dark Mode
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Enable dark mode for a better viewing experience in low light.
                                    </span>
                                </Switch.Label>
                                <Switch
                                    checked={darkMode}
                                    onChange={toggleDarkMode}
                                    className={`${
                                        darkMode ? 'bg-indigo-600' : 'bg-gray-200'
                                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`${
                                            darkMode ? 'translate-x-5' : 'translate-x-0'
                                        } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                                    />
                                </Switch>
                            </Switch.Group>
                        </div>
                    </div>
                </div>
            </section>

            {/* Notification Settings */}
            <section aria-labelledby="notification-settings-heading">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white dark:bg-gray-800 py-6 px-4 sm:p-6">
                        <div>
                            <h2
                                id="notification-settings-heading"
                                className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                            >
                                Notifications
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Manage your notification preferences.
                            </p>
                        </div>

                        <div className="mt-6">
                            <div className="space-y-4">
                                {Object.entries(notifications).map(([key, enabled]) => (
                                    <Switch.Group
                                        as="div"
                                        key={key}
                                        className="flex items-center justify-between"
                                    >
                                        <Switch.Label as="span" className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                                                {key} Notifications
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                Receive {key} notifications about your account.
                                            </span>
                                        </Switch.Label>
                                        <Switch
                                            checked={enabled}
                                            onChange={(checked) =>
                                                setNotifications((prev) => ({
                                                    ...prev,
                                                    [key]: checked
                                                }))
                                            }
                                            className={`${
                                                enabled ? 'bg-indigo-600' : 'bg-gray-200'
                                            } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={`${
                                                    enabled ? 'translate-x-5' : 'translate-x-0'
                                                } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                                            />
                                        </Switch>
                                    </Switch.Group>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save Preferences
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Settings;
