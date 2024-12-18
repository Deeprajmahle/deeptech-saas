import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            {/* Navigation */}
            <nav className="relative z-10 w-full backdrop-blur-sm bg-white/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <span className="text-2xl font-bold text-white">DeepTech</span>
                        </div>
                        <div className="flex space-x-4">
                            <Link to="/login" className="text-white hover:text-indigo-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out">
                                Login
                            </Link>
                            <Link to="/register" className="bg-white text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative">
                {/* Decorative background */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_#4f46e5,_transparent_50%)] opacity-25"></div>
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,_#7c3aed,_transparent_50%)] opacity-25"></div>
                
                <div className="relative max-w-7xl mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-pink-200">DeepTech</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-lg text-indigo-100 sm:text-xl md:mt-5 md:max-w-3xl">
                        Transform your business with our cutting-edge SaaS platform. Built by Deepraj, designed for the future.
                    </p>
                    
                    {/* Feature Cards */}
                    <div className="mt-16 grid gap-8 md:grid-cols-3 lg:gap-12">
                        {[
                            {
                                title: 'Analytics Dashboard',
                                description: 'Powerful insights at your fingertips',
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                )
                            },
                            {
                                title: 'Course Management',
                                description: 'Streamlined learning experience',
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                )
                            },
                            {
                                title: 'Real-time Updates',
                                description: 'Stay connected and informed',
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                )
                            }
                        ].map((feature, index) => (
                            <div key={index} className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                                <div className="relative p-6 backdrop-blur-lg bg-white/10 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-white mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-indigo-100">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="mt-20">
                        <Link
                            to="/register"
                            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Get Started
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-20 py-8 backdrop-blur-sm bg-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center text-indigo-100">
                            <p>Designed & Developed by <span className="font-semibold">Deepraj</span></p>
                            <p className="mt-2"> {new Date().getFullYear()} DeepTech. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Home;
