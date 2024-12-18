// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Dashboard from './components/dashboard/Dashboard';
import Analytics from './components/dashboard/Analytics';
import Settings from './components/dashboard/Settings';
import Home from './components/Home';
import Courses from './components/courses/Courses';
import CourseDetail from './components/courses/CourseDetail';
import Profile from './components/profile/Profile';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    return children;
};

// Auth aware route component
const AuthAwareRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? <Navigate to="/dashboard" /> : children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={
                        <AuthAwareRoute>
                            <Login />
                        </AuthAwareRoute>
                    } />
                    <Route path="/register" element={
                        <AuthAwareRoute>
                            <Register />
                        </AuthAwareRoute>
                    } />

                    {/* Protected Dashboard Routes */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Dashboard />
                            </DashboardLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="/analytics" element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Analytics />
                            </DashboardLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Settings />
                            </DashboardLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Profile />
                            </DashboardLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="/courses" element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Courses />
                            </DashboardLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="/courses/:id" element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <CourseDetail />
                            </DashboardLayout>
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
