import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Alumni {
  id: string;
  email: string;
  name: string;
  usn: string;
  batch: string;
  course: string;
  branch: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  phone: string;
  current_position?: string;
  current_company?: string;
  profile_photo_url?: string;
  is_approved: boolean;
  created_at?: string;
  updated_at?: string;
  last_login?: string;
}

interface AuthContextType {
  alumni: Alumni | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  usn: string;
  batch: string;
  course: string;
  branch: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  phone: string;
  currentPosition?: string;
  currentCompany?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [alumni, setAlumni] = useState<Alumni | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('alumni_token');
      if (token) {
        const tokenData = parseJWT(token);
        if (tokenData && tokenData.exp > Date.now()) {
          const { data } = await supabase.functions.invoke('get-alumni-profile', {
            body: { token }
          });
          
          if (data?.success) {
            setAlumni(data.alumni);
          }
        } else {
          localStorage.removeItem('alumni_token');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('alumni_token');
    } finally {
      setIsLoading(false);
    }
  };

  const parseJWT = (token: string) => {
    try {
      return JSON.parse(atob(token));
    } catch {
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data: functionResult, error } = await supabase.functions.invoke('auth-login', {
        body: { email, password }
      });

      if (error) throw error;

      if (functionResult.success) {
        localStorage.setItem('alumni_token', functionResult.token);
        setAlumni(functionResult.alumni);
        return { success: true, message: 'Login successful!' };
      } else {
        return { success: false, message: functionResult.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const { data: functionResult, error } = await supabase.functions.invoke('auth-register', {
        body: data
      });

      if (error) throw error;

      if (functionResult.success) {
        return { success: true, message: 'Registration successful! Please wait for approval.' };
      } else {
        return { success: false, message: functionResult.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('alumni_token');
    setAlumni(null);
  };

  return (
    <AuthContext.Provider value={{ alumni, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
