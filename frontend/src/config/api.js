import axios from 'axios';

// Get API URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL;

if (!API_BASE_URL) {
    console.warn('REACT_APP_API_URL is not set in environment variables, using default: http://localhost:5000');
}

const api = axios.create({
    baseURL: API_BASE_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000, // 15 seconds
});

// Add request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle expired token
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // Optionally redirect to login page
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
