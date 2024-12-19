import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './components/Home';  
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Analytics from './components/dashboard/Analytics';
import Settings from './components/settings/Settings';
import Users from './components/users/Users';
import Courses from './components/courses/Courses';
import CourseDetail from './components/courses/CourseDetail';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    return <Layout>{children}</Layout>;
};

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!user || user.role !== 'admin') {
        return <Navigate to="/dashboard" />;
    }
    
    return <Layout>{children}</Layout>;
};

const AuthRoute = ({ children }) => {
    const { user } = useAuth();
    if (user) {
        return <Navigate to="/dashboard" />;
    }
    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    
                    {/* Auth Routes */}
                    <Route path="/login" element={
                        <AuthRoute>
                            <Login />
                        </AuthRoute>
                    } />
                    <Route path="/signup" element={
                        <AuthRoute>
                            <Register />
                        </AuthRoute>
                    } />

                    {/* Protected Routes */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/analytics" element={
                        <ProtectedRoute>
                            <Analytics />
                        </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    } />
                    <Route path="/courses" element={
                        <ProtectedRoute>
                            <Courses />
                        </ProtectedRoute>
                    } />
                    <Route path="/courses/:id" element={
                        <ProtectedRoute>
                            <CourseDetail />
                        </ProtectedRoute>
                    } />
                    
                    {/* Admin Routes */}
                    <Route path="/users" element={
                        <AdminRoute>
                            <Users />
                        </AdminRoute>
                    } />
                    
                    {/* Catch all route */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
