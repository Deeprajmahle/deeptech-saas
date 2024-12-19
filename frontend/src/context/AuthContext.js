import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (token) {
            checkAuthStatus();
        } else {
            setLoading(false);
        }
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await api.get('/api/auth/me');
            if (response.data && response.data.user) {
                setUser(response.data.user);
            } else {
                localStorage.removeItem('token');
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check failed:', error.response?.data?.message || error.message);
            localStorage.removeItem('token');
            setUser(null);
            setError('Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const register = async ({ name, email, password }) => {
        try {
            setError(null);
            const response = await api.post('/api/auth/register', {
                name,
                email,
                password
            });
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                return response.data;
            }
            throw new Error('Registration failed - no token received');
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
            setError(errorMessage);
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            
            if (!email || !password) {
                throw new Error('Email and password are required');
            }

            const response = await api.post('/api/auth/login', { 
                email, 
                password 
            });
            
            if (!response.data || !response.data.token) {
                throw new Error('Invalid response from server');
            }

            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Login failed';
            setError(errorMessage);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setError(null);
    };

    const updateUser = (userData) => {
        try {
            setUser(prevUser => ({
                ...prevUser,
                ...userData
            }));
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Failed to update user data');
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        register,
        updateUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
