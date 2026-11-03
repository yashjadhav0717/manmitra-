import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, LoginInput, RegisterInput } from '@manmitra/shared';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  language: 'mr' | 'en';
  setLanguage: (lang: 'mr' | 'en') => void;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [language, setLanguageState] = useState<'mr' | 'en'>('mr');

  const setLanguage = (lang: 'mr' | 'en') => {
    setLanguageState(lang);
    localStorage.setItem('manmitra_lang', lang);
  };

  const refreshUser = async () => {
    try {
      const res = await fetch('/api/v1/auth/me');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data?.user) {
          setUser(json.data.user);
        }
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('manmitra_lang') as 'mr' | 'en' | null;
    if (savedLang) {
      setLanguageState(savedLang);
    }
    refreshUser();
  }, []);

  const login = async (data: LoginInput) => {
    const res = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error?.message || 'Login failed');
    }
    setUser(json.data.user);
  };

  const register = async (data: RegisterInput) => {
    const res = await fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error?.message || 'Registration failed');
    }
    setUser(json.data.user);
  };

  const logout = async () => {
    try {
      await fetch('/api/v1/auth/logout', { method: 'POST' });
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        language,
        setLanguage,
        login,
        register,
        logout,
        refreshUser,
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
