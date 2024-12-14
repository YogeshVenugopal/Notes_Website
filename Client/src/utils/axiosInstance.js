import axios from 'axios';
import { BASE_URL } from './Constants';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});
axiosInstance.interceptors.request.use((config) => {
    console.log('Request Config:', config); // Log request details
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default axiosInstance;