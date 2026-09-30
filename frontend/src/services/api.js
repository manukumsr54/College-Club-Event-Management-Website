import axios from 'axios';

// Resolve API base URL:
// - In single unified Vercel deployment: defaults to '/api' (same origin)
// - In separate frontend deployment: uses VITE_API_URL (e.g. https://your-backend.vercel.app/api)
// - In local development: defaults to '/api' (proxied by Vite to http://localhost:5000)
const rawBaseURL = import.meta.env.VITE_API_URL;
const baseURL = rawBaseURL && rawBaseURL.trim() ? rawBaseURL.trim().replace(/\/+$/, '') : '/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor: attach admin JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('codechef_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: extract error messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        error.message ||
        'An unexpected error occurred. Please try again.',
      errors: error.response?.data?.errors || null,
    };

    // If 401 on an admin endpoint, optionally trigger logout
    if (error.response?.status === 401 && window.location.pathname.startsWith('/admin')) {
      if (!window.location.pathname.includes('/login')) {
        localStorage.removeItem('codechef_admin_token');
        localStorage.removeItem('codechef_admin_user');
        window.location.href = '/admin/login';
      }
    }

    return Promise.reject(customError);
  }
);

export default api;
