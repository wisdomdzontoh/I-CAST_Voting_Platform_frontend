import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

// API base URL
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management
const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

const initializeAuth = () => {
  const accessToken = localStorage.getItem('access');
  if (accessToken) setAuthToken(accessToken);
};

// Call initializeAuth at startup
initializeAuth();

// Token refresh function
export const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh');
  if (!refresh) throw new Error('No refresh token found');

  try {
    const response = await api.post('/token/refresh/', { refresh });
    const { access } = response.data;

    localStorage.setItem('access', access);
    setAuthToken(access);
    return access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    logout();
    throw error;
  }
};

// Axios response interceptor for token refresh and error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        logout();
        throw refreshError;
      }
    } else if (error.response?.status === 403) {
      toast.error('You do not have permission to access this resource.');
    }

    return Promise.reject(error);
  }
);

// Logout function
export const logout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  setAuthToken(null);
  window.location.href = '/login';
  toast.success('Logged out successfully!');
};

// Login function
export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/login/', { username, password });
    const { access, refresh } = response.data;

    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    setAuthToken(access);
    toast.success('Logged in successfully!');
    return response.data;
  } catch (error) {
    handleApiError('Error logging in:', error, 'Invalid credentials. Please try again.');
  }
};

// Register function
export const register = async (formData: { first_name: string; last_name: string; username: string; email: string; password: string }) => {
  try {
    const response = await api.post('/register/', formData);
    toast.success('Registration successful! Please log in.');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed. Please try again.';
  }
};

// Create Organization
export const createOrganization = async (data: {
  name: string,
  organization_type: string,
  email: string,
  address: string,
  phone_number?: string,
  website?: string,
  domain?: string,
  logo?: File
}) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== undefined) {
      formData.append(key, data[key as keyof typeof data]);
    }
  }

  const response = await api.post(`/organizations/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Read (Get) Organization by ID
export const getOrganization = async (id: number) => {
  const response = await api.get(`/organizations/${id}/`);
  return response.data;
};

// Update Organization
export const updateOrganization = async (id: number, data: {
  name?: string,
  organization_type?: string,
  email?: string,
  address?: string,
  phone_number?: string,
  website?: string,
  domain?: string,
  logo?: File
}) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== undefined) {
      formData.append(key, data[key as keyof typeof data]);
    }
  }

  const response = await api.put(`/organizations/${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Delete Organization
export const deleteOrganization = async (id: number) => {
  const response = await api.delete(`/organizations/${id}/`);
  return response.data;
};

// Fetch Organizations
export const FetchOrganization = async () => {
  const response = await api.get(`/organizations/`);
  return response.data;
};

// Fetch Subscription Plans
export const fetchSubscriptionPlans = async () => {
  const response = await api.get('/subscription-plans/');
  return response.data;
};

// Export API service functions
const apiService = {
  login,
  logout,
  FetchOrganization,
  createOrganization,
  deleteOrganization,
  updateOrganization,
  getOrganization,
  setAuthToken,
  initializeAuth,
  refreshToken,
  fetchSubscriptionPlans,
};

export default apiService;
