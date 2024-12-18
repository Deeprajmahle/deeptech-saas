import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        level: '',
        search: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, [filters]);

    const fetchCourses = async () => {
        try {
            const queryParams = new URLSearchParams({
                ...filters,
                page: 1,
                limit: 12,
            }).toString();

            const response = await api.get(`/api/courses?${queryParams}`);
            setCourses(response.data.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const categories = [
        'Web Development',
        'Mobile Development',
        'Data Science',
        'AI/ML',
        'Cloud Computing',
        'DevOps',
        'Cybersecurity',
        'UI/UX',
    ];

    const levels = ['Beginner', 'Intermediate', 'Advanced'];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
                <p className="mt-2 text-gray-600">Expand your knowledge with our courses</p>
            </div>

            {/* Filters */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                        Search
                    </label>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Search courses..."
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        name="category"
                        id="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                        Level
                    </label>
                    <select
                        name="level"
                        id="level"
                        value={filters.level}
                        onChange={handleFilterChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">All Levels</option>
                        {levels.map((level) => (
                            <option key={level} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses.map((course) => (
                    <div
                        key={course._id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                        onClick={() => navigate(`/courses/${course._id}`)}
                    >
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                                    {course.category}
                                </span>
                                <span className="text-sm text-gray-500">{course.level}</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={course.instructor.avatar}
                                        alt={course.instructor.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="text-sm text-gray-600">{course.instructor.name}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <i className="fas fa-star text-yellow-400"></i>
                                    <span className="text-sm font-semibold">
                                        {course.statistics.averageRating || 0}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-lg font-bold text-gray-900">
                                    {course.price === 0 ? 'Free' : `$${course.price}`}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {course.duration} hours
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
