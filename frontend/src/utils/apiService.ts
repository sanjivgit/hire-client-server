import axios from 'axios';

// Create an axios instance with default configurations
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:2001',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add auth token if available
apiClient.interceptors.request.use(
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

// Add a response interceptor to handle common errors
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle unauthorized errors or token expiration
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user')
            window.location.replace('/auth/login')
            // You can redirect to login page if needed
        }
        return Promise.reject(error);
    }
);

export default apiClient; 