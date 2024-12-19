import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Calendar from './Calendar';

const Dashboard = () => {
    const { user } = useAuth();

    const skillSet = [
        { name: 'Java', progress: 60 },
        { name: 'C++', progress: 40 },
        { name: 'Python', progress: 75 },
        { name: 'Figma', progress: 85 },
        { name: 'Cloud System', progress: 55 },
        { name: 'IT Solution', progress: 70 },
    ];

    const mostWantedSkills = [
        { name: 'Analytics and Data Management', requests: 22 },
        { name: 'Security System Architecture', requests: 18 },
    ];

    const activities = [
        { 
            user: 'Adriana',
            action: 'posted cloud system security',
            time: '1 Hours Ago',
            avatar: 'https://ui-avatars.com/api/?name=Adriana&background=random'
        },
        {
            user: 'Gracie',
            action: 'liked your Post',
            time: '1 Hours Ago',
            avatar: 'https://ui-avatars.com/api/?name=Gracie&background=random'
        },
        {
            user: 'Peter',
            action: 'posted cloud system security',
            time: '2 Hours Ago',
            avatar: 'https://ui-avatars.com/api/?name=Peter&background=random'
        }
    ];

    const upcomingCourses = [
        {
            name: 'Cyber Security',
            time: '2:00pm-4:00pm',
            progress: 62
        },
        {
            name: 'UX Research',
            time: '4:30pm-6:00pm',
            progress: 45
        }
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6 text-white">
                <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
                <p className="mt-2 opacity-90">Here's what's happening with your courses today.</p>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Skills Progress - Full width on mobile, 2 cols on tablet, 1 col on desktop */}
                <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Skills Progress</h2>
                    <div className="space-y-4">
                        {skillSet.map((skill, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">{skill.name}</span>
                                    <span className="text-sm text-gray-500">{skill.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-indigo-600 h-2 rounded-full"
                                        style={{ width: `${skill.progress}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Calendar Section - Full width on mobile, 2 cols on tablet/desktop */}
                <div className="md:col-span-2 lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Calendar</h2>
                    <Calendar />
                </div>

                {/* Activities Section - Spans full width on mobile, 1 col on tablet/desktop */}
                <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
                    <div className="space-y-4">
                        {activities.map((activity, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <img
                                    src={activity.avatar}
                                    alt={activity.user}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        {activity.user} <span className="font-normal">{activity.action}</span>
                                    </p>
                                    <p className="text-sm text-gray-500">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Upcoming Courses */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Upcoming Courses</h2>
                    <div className="space-y-4">
                        {upcomingCourses.map((course, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-medium">{course.name}</h3>
                                    <span className="text-sm text-gray-500">{course.time}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                    <div
                                        className="bg-indigo-600 h-2 rounded-full"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Most Wanted Skills */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Most Wanted Skills</h2>
                    <div className="space-y-4">
                        {mostWantedSkills.map((skill, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <span className="text-sm font-medium">{skill.name}</span>
                                <span className="text-sm text-gray-500">{skill.requests} requests</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
