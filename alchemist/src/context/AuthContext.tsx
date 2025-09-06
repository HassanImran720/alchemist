"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface UserType {
  email: string;
  name: string;
  authMethod: string;
}

interface AuthContextType {
  user: UserType | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginData, method: 'manual' | 'google' | 'github') => Promise<void>;
  register: (data: RegisterData, method: 'manual' | 'google' | 'github') => Promise<void>;
  logout: () => void;
}

interface LoginData {
  email?: string;
  password?: string;
  token?: string;
}

interface RegisterData {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (data: LoginData, method: 'manual' | 'google' | 'github') => {
    setLoading(true);
    setError(null);
    let url = '';
    if (method === 'manual') url = '/api/auth/login/manual';
    if (method === 'google') url = '/api/auth/login/google';
    if (method === 'github') url = '/api/auth/login/github';
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Login failed');
      setToken(result.token);
      setUser(result.user);
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      router.push('/lab');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData, method: 'manual' | 'google' | 'github') => {
    setLoading(true);
    setError(null);
    let url = '';
    if (method === 'manual') url = '/api/auth/register/manual';
    if (method === 'google') url = '/api/auth/register/google';
    if (method === 'github') url = '/api/auth/register/github';
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Registration failed');
      setToken(result.token);
      setUser(result.user);
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      router.push('/lab');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
