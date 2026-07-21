import axios from 'axios';

// Directly targeting auth-service port 8081 for local development
const API_BASE_URL = 'http://localhost:8081/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Dynamic URL adapter for local service routing
api.interceptors.request.use(
  (config) => {
    if (config.url?.startsWith('/auth')) {
      config.baseURL = 'http://localhost:8081/api';
    } else if (config.url?.startsWith('/content')) {
      config.baseURL = 'http://localhost:8083/api';
    } else if (config.url?.startsWith('/matches')) {
      config.baseURL = 'http://localhost:8086/api';
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
