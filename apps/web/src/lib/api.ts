import axios from 'axios';

// Get the base API gateway URL (defaulting to localhost:8080/api for local dev if not set)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : 'http://localhost:8080/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Dynamic URL adapter for local service routing (only active when NEXT_PUBLIC_API_URL is NOT set)
api.interceptors.request.use(
  (config) => {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      if (config.url?.startsWith('/auth')) {
        config.baseURL = 'http://localhost:8081/api';
      } else if (config.url?.startsWith('/content')) {
        config.baseURL = 'http://localhost:8083/api';
      } else if (config.url?.startsWith('/matches')) {
        config.baseURL = 'http://localhost:8086/api';
      }
    }

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    }
    return Promise.reject(error);
  }
);
