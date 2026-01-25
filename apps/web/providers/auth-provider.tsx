'use client';

import { api } from '@/lib/api';
import { createContext, useCallback, useContext, useEffect } from 'react';
import { clearAuth as clearAuthUtil } from '@/utils/auth-utils';
import { User } from '@/lib/types/user';

interface AuthContextType {
  setAuth: (deviceId: string, user: User) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType>({
  setAuth: () => {},
  clearAuth: () => {},
});

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setAuth = useCallback((deviceId: string, user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('deviceId', deviceId);
  }, []);

  const clearAuth = useCallback(() => {
    clearAuthUtil();
  }, []);

  useEffect(() => {
    const deviceId = localStorage.getItem('deviceId');
    if (!deviceId) return;

    const refreshAccessToken = async () => {
      try {
        const response = await api.post('/auth/refresh');
        const { deviceId, user } = response.data;
        if (deviceId) {
          setAuth(deviceId, user);
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
    <AuthContext.Provider value={{ setAuth, clearAuth }}>
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
