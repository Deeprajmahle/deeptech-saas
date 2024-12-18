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
            console.log('Checking auth status...'); // Debug log
            const response = await api.get('/api/auth/me');
            console.log('Auth status response:', response.data); // Debug log
            
            if (response.data && response.data.user) {
                setUser(response.data.user);
            } else {
                console.log('No user data in response'); // Debug log
                localStorage.removeItem('token');
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check failed:', error.response || error);
            localStorage.removeItem('token');
            setUser(null);
            setError('Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            console.log('Attempting login...'); // Debug log
            
            const response = await api.post('/api/auth/login', { email, password });
            console.log('Login response:', response.data); // Debug log
            
            if (response.data && response.data.token && response.data.user) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                return { success: true };
            }
            throw new Error('Invalid response from server');
        } catch (error) {
            console.error('Login failed:', error.response || error);
            setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    };

    const logout = async () => {
        try {
            console.log('Logging out...'); // Debug log
            await api.post('/api/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            console.log('Attempting registration...'); // Debug log
            
            const response = await api.post('/api/auth/register', userData);
            console.log('Registration response:', response.data); // Debug log
            
            if (response.data && response.data.token && response.data.user) {
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
                return { success: true };
            }
            throw new Error('Invalid response from server');
        } catch (error) {
            console.error('Registration failed:', error.response || error);
            setError(error.response?.data?.message || 'Registration failed');
            return { success: false, error: error.response?.data?.message || 'Registration failed' };
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        register,
        checkAuthStatus
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
