import axios from 'axios';
import { setAccessToken, clearAuth } from '@/utils/auth-utils';

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

    if (axios.isAxiosError(error) && error.response) {
      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        deviceId
      ) {
        originalRequest._retry = true;

        try {
          const response = await api.post('/auth/refresh', null, {
            headers: {
              'x-device-id': deviceId,
            },
          });
          const { access_token, deviceId: newDeviceId } = response.data;
          if (access_token && newDeviceId) {
            setAccessToken(access_token);
            originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
            return api(originalRequest);
          } else {
            clearAuth();
          }
        } catch (err) {
          console.error('Refresh token failed', err);
          clearAuth();
        }
      }
    }

    return Promise.reject(error);
  },
);
