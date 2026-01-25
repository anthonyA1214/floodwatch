import axios from 'axios';
import { clearAuth } from '@/utils/auth-utils';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const deviceId = localStorage.getItem('deviceId');

  if (deviceId) {
    config.headers['x-device-id'] = deviceId;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const deviceId = localStorage.getItem('deviceId');

    if (!axios.isAxiosError(error) || !error.response) {
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === '/auth/refresh'
    ) {
      clearAuth();
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry && deviceId) {
      originalRequest._retry = true;

      try {
        await api.post('/auth/refresh', null, {
          headers: {
            'x-device-id': deviceId,
          },
        });

        return api(originalRequest);
      } catch (err) {
        console.error('Refresh token failed', err);
        clearAuth();
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
