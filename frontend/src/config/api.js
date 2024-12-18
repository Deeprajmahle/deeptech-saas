import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout');
            return Promise.reject(new Error('Request timeout - please try again'));
        }
        
        if (!error.response) {
            console.error('Network error:', error);
            return Promise.reject(new Error('Network error - please check your connection'));
        }

        if (error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

const api = {
    get: (endpoint) => axiosInstance.get(endpoint),
    post: (endpoint, data) => axiosInstance.post(endpoint, data),
    put: (endpoint, data) => axiosInstance.put(endpoint, data),
    delete: (endpoint) => axiosInstance.delete(endpoint)
};

export default api;
