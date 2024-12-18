import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

console.log('API Base URL:', API_BASE_URL); // Debug log

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000, // Increased to 15 seconds
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Making request to:', config.url); // Debug log
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response received:', response.status); // Debug log
        return response;
    },
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response error data:', error.response.data);
            console.error('Response error status:', error.response.status);
            console.error('Response error headers:', error.response.headers);

            // Handle 401 Unauthorized
            if (error.response.status === 401) {
                localStorage.removeItem('token'); // Clear invalid token
                window.location.href = '/login'; // Redirect to login
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up request:', error.message);
        }

        return Promise.reject(error);
    }
);

const api = {
    get: (endpoint) => axiosInstance.get(endpoint),
    post: (endpoint, data) => axiosInstance.post(endpoint, data),
    put: (endpoint, data) => axiosInstance.put(endpoint, data),
    delete: (endpoint) => axiosInstance.delete(endpoint),
};

export default api;
