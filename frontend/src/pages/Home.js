import React from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, BookOpenIcon, BoltIcon } from '@heroicons/react/24/outline';

const features = [
    {
        title: 'Analytics Dashboard',
        description: 'Powerful insights at your fingertips',
        icon: ChartBarIcon,
    },
    {
        title: 'Course Management',
        description: 'Streamlined learning experience',
        icon: BookOpenIcon,
    },
    {
        title: 'Real-time Updates',
        description: 'Stay connected and informed',
        icon: BoltIcon,
    },
];

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-purple-800">
            {/* Navigation */}
            <nav className="px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-white">
                    DeepTech
                </Link>
                <div className="space-x-4">
                    <Link to="/login" className="text-white hover:text-purple-200">
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="bg-white text-purple-600 px-4 py-2 rounded-md hover:bg-purple-100 transition-colors"
                    >
                        Sign Up
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8">
                    Welcome to <span className="text-white">DeepTech</span>
                </h1>
                <p className="text-lg sm:text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
                    Transform your business with our cutting-edge SaaS platform. Built by Deepraj,
                    designed for the future.
                </p>
            </div>

            {/* Features Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-purple-400 bg-opacity-20 backdrop-blur-lg rounded-lg p-6 text-center hover:bg-opacity-30 transition-all duration-300"
                        >
                            <div className="flex justify-center mb-4">
                                <feature.icon className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-purple-100">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Button */}
            <div className="text-center pb-20">
                <Link
                    to="/get-started"
                    className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-medium rounded-md hover:bg-purple-100 transition-colors"
                >
                    Get Started
                    <svg
                        className="ml-2 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default Home;
