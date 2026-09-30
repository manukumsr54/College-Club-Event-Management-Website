import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentAdmin, logout as logoutApi } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('codechef_admin_token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const storedToken = localStorage.getItem('codechef_admin_token');
      const storedUser = localStorage.getItem('codechef_admin_user');

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      if (storedUser) {
        try {
          setAdmin(JSON.parse(storedUser));
        } catch {
          // ignore parsing error
        }
      }

      try {
        const res = await getCurrentAdmin();
        if (res.success && res.data) {
          setAdmin(res.data);
          localStorage.setItem('codechef_admin_user', JSON.stringify(res.data));
        }
      } catch (err) {
        console.warn('Session verification failed, logging out:', err.message);
        localStorage.removeItem('codechef_admin_token');
        localStorage.removeItem('codechef_admin_user');
        setAdmin(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const loginAdmin = (userData, userToken) => {
    setAdmin(userData);
    setToken(userToken);
    localStorage.setItem('codechef_admin_token', userToken);
    localStorage.setItem('codechef_admin_user', JSON.stringify(userData));
  };

  const logoutAdmin = async () => {
    await logoutApi();
    localStorage.removeItem('codechef_admin_token');
    localStorage.removeItem('codechef_admin_user');
    setAdmin(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token && !!admin,
        isLoading,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
