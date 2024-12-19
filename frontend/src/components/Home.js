import React from 'react';
import { Link } from 'react-router-dom';

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

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 pt-20 text-center">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8">
                    Welcome to DeepTech
                </h1>
                <p className="text-lg sm:text-xl text-purple-100 mb-16 max-w-3xl mx-auto">
                    Transform your business with our cutting-edge SaaS platform. Built by Deepraj,
                    designed for the future.
                </p>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {/* Analytics Dashboard Card */}
                    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 text-center">
                        <div className="text-white text-3xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Analytics Dashboard
                        </h3>
                        <p className="text-purple-100">
                            Powerful insights at your fingertips
                        </p>
                    </div>

                    {/* Course Management Card */}
                    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 text-center">
                        <div className="text-white text-3xl mb-4">📚</div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Course Management
                        </h3>
                        <p className="text-purple-100">
                            Streamlined learning experience
                        </p>
                    </div>

                    {/* Real-time Updates Card */}
                    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 text-center">
                        <div className="text-white text-3xl mb-4">⚡</div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Real-time Updates
                        </h3>
                        <p className="text-purple-100">
                            Stay connected and informed
                        </p>
                    </div>
                </div>

                {/* CTA Button */}
                <Link
                    to="/signup"
                    className="inline-flex items-center px-8 py-3 bg-white text-purple-600 font-medium rounded-md hover:bg-purple-100 transition-colors text-lg"
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
