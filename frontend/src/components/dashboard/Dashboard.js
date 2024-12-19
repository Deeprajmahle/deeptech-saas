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
            time: '10:00am-12:00pm',
            progress: 20
        }
    ];

    const certifications = [
        { name: 'Mobile Design', rating: 4 },
        { name: 'DSA', rating: 5 },
        { name: 'Data Analytics', rating: 5 }
    ];

    const jobs = [
        {
            title: 'Cyber Security',
            company: 'Gurugram',
            logo: '/path/to/logo1.png'
        },
        {
            title: 'Data Science',
            company: 'Andheri',
            logo: '/path/to/logo2.png'
        }
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">My Dashboard</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <select className="appearance-none bg-gray-100 rounded-lg px-4 py-2 pr-8 text-gray-700">
                            <option>Courses</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="what you looking for ?"
                            className="bg-gray-100 rounded-lg px-4 py-2 w-64 text-gray-700"
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                    <button className="p-2 text-gray-600 hover:text-gray-900">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>
                    <div className="flex items-center space-x-2">
                        <img
                            src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}`}
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="font-medium">{user?.name || 'John Antony'}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Left Column */}
                <div className="col-span-3">
                    <div className="bg-white rounded-lg p-6 mb-6">
                        <div className="text-center mb-6">
                            <img
                                src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'John Antony')}&size=200`}
                                alt="Profile"
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                            <h2 className="text-xl font-semibold">{user?.name || 'John Antony'}</h2>
                            <p className="text-gray-500">"IT Specialist"</p>
                        </div>
                        
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-500">8.2</div>
                                <div className="text-sm text-gray-500">Overall Rating</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-500">75%</div>
                                <div className="text-sm text-gray-500">Completed Projects</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-500">10</div>
                                <div className="text-sm text-gray-500">Proficient Skills</div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-4">Deadline</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span>AI/ML</span>
                                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">4 Days left</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>UI/UX</span>
                                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">2 Days left</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Skill Set</h3>
                            <div className="space-y-4">
                                {skillSet.map((skill, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>{skill.name}</span>
                                            <span>{skill.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 rounded-full h-2"
                                                style={{ width: `${skill.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Column */}
                <div className="col-span-6">
                    <div className="bg-indigo-600 rounded-lg p-6 mb-6 text-white">
                        <h2 className="text-2xl font-semibold mb-2">Upcoming Courses</h2>
                        <p className="mb-4">Enroll in new courses</p>
                        <img src="/path/to/illustration.svg" alt="" className="w-1/2 mx-auto" />
                    </div>

                    <div className="bg-white rounded-lg p-6 mb-6">
                        <h3 className="font-semibold mb-6">Courses</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {upcomingCourses.map((course, index) => (
                                <div key={index} className="p-4 border rounded-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-medium">{course.name}</h4>
                                        <div className="relative w-12 h-12">
                                            <svg className="transform -rotate-90 w-12 h-12">
                                                <circle
                                                    className="text-gray-200"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    fill="transparent"
                                                    r="20"
                                                    cx="24"
                                                    cy="24"
                                                />
                                                <circle
                                                    className="text-blue-500"
                                                    strokeWidth="2"
                                                    strokeDasharray={125.6}
                                                    strokeDashoffset={125.6 * (1 - course.progress / 100)}
                                                    strokeLinecap="round"
                                                    stroke="currentColor"
                                                    fill="transparent"
                                                    r="20"
                                                    cx="24"
                                                    cy="24"
                                                />
                                            </svg>
                                            <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                                                {course.progress}%
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500">{course.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6">
                        <h3 className="font-semibold mb-6">Certification</h3>
                        <div className="space-y-4">
                            {certifications.map((cert, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span>{cert.name}</span>
                                    <div className="flex text-yellow-400">
                                        {[...Array(cert.rating)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="col-span-3">
                    <div className="bg-white rounded-lg p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold">Most Wanted Skills (20)</h3>
                            <button className="text-sm text-gray-500">Filters</button>
                        </div>
                        <div className="space-y-4">
                            {mostWantedSkills.map((skill, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex justify-between items-center">
                                        <span>{skill.name}</span>
                                        <span className="text-sm text-gray-500">{skill.requests} Request</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="text-blue-500 text-sm mt-4">See All</button>
                    </div>

                    <Calendar />

                    <div className="bg-white rounded-lg p-6 mb-6">
                        <h3 className="font-semibold mb-4">Latest Rating</h3>
                        <div className="bg-blue-500 text-white rounded-lg p-4">
                            <div className="text-2xl font-bold mb-2">7.6</div>
                            <div className="mb-2">Project</div>
                            <div className="text-lg font-semibold mb-1">Myspace Layouts</div>
                            <div className="text-sm">Adriana</div>
                            <div className="text-sm mt-2">2 days ago</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold">Activities (24)</h3>
                            <button className="text-sm text-gray-500">See All</button>
                        </div>
                        <div className="space-y-6">
                            {activities.map((activity, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <img src={activity.avatar} alt="" className="w-8 h-8 rounded-full" />
                                    <div>
                                        <p className="text-sm">
                                            <span className="font-medium">{activity.user}</span>
                                            {' '}{activity.action}
                                        </p>
                                        <p className="text-sm text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
