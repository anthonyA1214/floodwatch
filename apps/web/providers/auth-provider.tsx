'use client';

import { api } from '@/lib/api';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  setAccessToken as setMemoryAccessToken,
  clearAuth as clearAuthUtil,
} from '@/utils/auth-utils';

interface AuthContextType {
  accessToken: string | null;
  setAuth: (token: string, deviceId: string) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAuth: () => {},
  clearAuth: () => {},
});

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const setAuth = useCallback((token: string, deviceId: string) => {
    setAccessToken(token);
    setMemoryAccessToken(token);
    localStorage.setItem('deviceId', deviceId);
  }, []);

  const clearAuth = useCallback(() => {
    setAccessToken(null);
    clearAuthUtil();
  }, []);

  useEffect(() => {
    const deviceId = localStorage.getItem('deviceId');
    if (!deviceId) return;

    const refreshAccessToken = async () => {
      try {
        console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
        const response = await api.post('/auth/refresh');
        const { access_token, deviceId } = response.data;
        if (access_token && deviceId) {
          setAuth(access_token, deviceId);
        } else {
          clearAuth();
        }
      } catch (err) {
        console.error('Refresh token failed', err);
        clearAuth();
      }
    };

    refreshAccessToken();
  }, [setAuth, clearAuth]);

  return (
    <AuthContext.Provider value={{ accessToken, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth must be used within AuthContextProvider');
  return context;
}
