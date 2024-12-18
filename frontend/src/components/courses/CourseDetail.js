import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../config/api';

const CourseDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [enrolling, setEnrolling] = useState(false);

    useEffect(() => {
        fetchCourseDetails();
    }, [id]);

    const fetchCourseDetails = async () => {
        try {
            const response = await api.get(`/api/courses/${id}`);
            setCourse(response.data.data);
        } catch (error) {
            console.error('Error fetching course details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        try {
            setEnrolling(true);
            await api.post(`/api/courses/${id}/enroll`);
            // Refresh course details to update enrollment status
            await fetchCourseDetails();
        } catch (error) {
            console.error('Error enrolling in course:', error);
        } finally {
            setEnrolling(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="relative h-96">
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
                        <div className="container mx-auto px-4">
                            <div className="max-w-3xl">
                                <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-indigo-600 rounded-full mb-4">
                                    {course.category}
                                </span>
                                <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
                                <div className="flex items-center space-x-4 text-white">
                                    <div className="flex items-center space-x-2">
                                        <i className="fas fa-user"></i>
                                        <span>{course.instructor.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <i className="fas fa-clock"></i>
                                        <span>{course.duration} hours</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <i className="fas fa-signal"></i>
                                        <span>{course.level}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* Navigation Tabs */}
                    <div className="bg-white rounded-lg shadow-lg mb-8">
                        <div className="border-b">
                            <nav className="flex">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`px-6 py-4 text-sm font-medium ${
                                        activeTab === 'overview'
                                            ? 'text-indigo-600 border-b-2 border-indigo-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('curriculum')}
                                    className={`px-6 py-4 text-sm font-medium ${
                                        activeTab === 'curriculum'
                                            ? 'text-indigo-600 border-b-2 border-indigo-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Curriculum
                                </button>
                                <button
                                    onClick={() => setActiveTab('reviews')}
                                    className={`px-6 py-4 text-sm font-medium ${
                                        activeTab === 'reviews'
                                            ? 'text-indigo-600 border-b-2 border-indigo-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Reviews
                                </button>
                            </nav>
                        </div>

                        <div className="p-6">
                            {activeTab === 'overview' && (
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                        Course Description
                                    </h3>
                                    <p className="text-gray-600 mb-6">{course.description}</p>

                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                        What you'll learn
                                    </h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        {course.objectives.map((objective, index) => (
                                            <li key={index} className="flex items-start space-x-2">
                                                <i className="fas fa-check text-green-500 mt-1"></i>
                                                <span className="text-gray-600">{objective}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                        Requirements
                                    </h3>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        {course.requirements.map((requirement, index) => (
                                            <li key={index}>{requirement}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {activeTab === 'curriculum' && (
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                        Course Content
                                    </h3>
                                    <div className="space-y-4">
                                        {course.modules.map((module, index) => (
                                            <div key={index} className="border rounded-lg">
                                                <div className="p-4 bg-gray-50 flex justify-between items-center">
                                                    <h4 className="font-medium">{module.title}</h4>
                                                    <span className="text-sm text-gray-500">
                                                        {module.duration} mins
                                                    </span>
                                                </div>
                                                <ul className="divide-y">
                                                    {module.lessons.map((lesson, lessonIndex) => (
                                                        <li
                                                            key={lessonIndex}
                                                            className="p-4 flex items-center justify-between"
                                                        >
                                                            <div className="flex items-center space-x-2">
                                                                <i
                                                                    className={`fas ${
                                                                        lesson.type === 'video'
                                                                            ? 'fa-play-circle'
                                                                            : lesson.type === 'quiz'
                                                                            ? 'fa-question-circle'
                                                                            : 'fa-file-alt'
                                                                    } text-gray-400`}
                                                                ></i>
                                                                <span>{lesson.title}</span>
                                                            </div>
                                                            <span className="text-sm text-gray-500">
                                                                {lesson.duration} mins
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            Student Reviews
                                        </h3>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-3xl font-bold text-gray-900">
                                                {course.statistics.averageRating}
                                            </span>
                                            <div>
                                                <div className="flex text-yellow-400">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <i
                                                            key={star}
                                                            className={`fas fa-star ${
                                                                star <= course.statistics.averageRating
                                                                    ? 'text-yellow-400'
                                                                    : 'text-gray-300'
                                                            }`}
                                                        ></i>
                                                    ))}
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    {course.statistics.totalRatings} reviews
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {course.ratings.map((review, index) => (
                                            <div key={index} className="border-b pb-6">
                                                <div className="flex items-start space-x-4">
                                                    <img
                                                        src={review.user.avatar}
                                                        alt={review.user.name}
                                                        className="w-12 h-12 rounded-full"
                                                    />
                                                    <div>
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <h4 className="font-medium">
                                                                {review.user.name}
                                                            </h4>
                                                            <div className="flex text-yellow-400">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <i
                                                                        key={star}
                                                                        className={`fas fa-star ${
                                                                            star <= review.rating
                                                                                ? 'text-yellow-400'
                                                                                : 'text-gray-300'
                                                                        }`}
                                                                    ></i>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-600">{review.review}</p>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {new Date(review.date).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div>
                    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                        <div className="text-center mb-6">
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                {course.price === 0 ? 'Free' : `$${course.price}`}
                            </h3>
                        </div>

                        <button
                            onClick={handleEnroll}
                            disabled={enrolling}
                            className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                                enrolling
                                    ? 'bg-indigo-400'
                                    : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                        >
                            {enrolling ? 'Enrolling...' : 'Enroll Now'}
                        </button>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-users text-gray-400"></i>
                                <span className="text-gray-600">
                                    {course.statistics.totalEnrolled} students enrolled
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-clock text-gray-400"></i>
                                <span className="text-gray-600">
                                    Last updated {new Date(course.updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-globe text-gray-400"></i>
                                <span className="text-gray-600">English</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-medium text-gray-900 mb-4">This course includes:</h4>
                            <ul className="space-y-3">
                                <li className="flex items-center space-x-2">
                                    <i className="fas fa-video text-gray-400"></i>
                                    <span className="text-gray-600">
                                        {course.duration} hours of video content
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <i className="fas fa-file-alt text-gray-400"></i>
                                    <span className="text-gray-600">
                                        {course.modules.reduce(
                                            (acc, module) => acc + module.lessons.length,
                                            0
                                        )}{' '}
                                        lessons
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <i className="fas fa-infinity text-gray-400"></i>
                                    <span className="text-gray-600">Full lifetime access</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <i className="fas fa-mobile-alt text-gray-400"></i>
                                    <span className="text-gray-600">
                                        Access on mobile and desktop
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <i className="fas fa-certificate text-gray-400"></i>
                                    <span className="text-gray-600">
                                        Certificate of completion
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
