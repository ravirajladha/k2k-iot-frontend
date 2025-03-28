import axios from 'axios';
import { store } from '@/store/store';
import { clearUser } from '@/store/slices/authSlice';
import { refreshAccessToken } from '@/store/slices/authSlice'; // Import the refresh token action

const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await store.dispatch(refreshAccessToken()).unwrap(); // Attempt to refresh the access token
      } catch (e) {
        store.dispatch(clearUser()); // If refresh fails, log out the user
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
