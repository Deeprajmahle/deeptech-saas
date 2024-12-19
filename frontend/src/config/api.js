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
        console.log('API Request:', {
            url: config.url,
            method: config.method,
            baseURL: config.baseURL,
            hasToken: !!token
        });
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    (response) => {
        console.log('API Response:', {
            url: response.config.url,
            status: response.status,
            data: response.data ? 'Present' : 'Empty'
        });
        return response;
    },
    (error) => {
        if (error.response) {
            console.error('API Error:', {
                url: error.config.url,
                status: error.response.status,
                data: error.response.data
            });

            // Handle 401 Unauthorized
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Request setup error:', error.message);
        }
        return Promise.reject(error);
    }
);

// Export the axios instance directly
export default api;
