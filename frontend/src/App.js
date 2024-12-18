import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Analytics from './components/dashboard/Analytics';
import Settings from './components/dashboard/Settings';
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
    
    return children;
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
                    {/* Auth Routes */}
                    <Route path="/login" element={
                        <AuthRoute>
                            <Login />
                        </AuthRoute>
                    } />
                    <Route path="/register" element={
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

                    {/* Redirect root to dashboard or login */}
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    
                    {/* Catch all route */}
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
