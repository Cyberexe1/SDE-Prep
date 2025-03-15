import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, password: string, email: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Default user for demo purposes
const DEFAULT_USER: User = {
  id: "1",
  username: "demo_user",
  name: "Demo User",
  email: "demo@example.com"
};

const DEFAULT_PASSWORD = "password123";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username === DEFAULT_USER.username && password === DEFAULT_PASSWORD) {
      setUser(DEFAULT_USER);
      localStorage.setItem('user', JSON.stringify(DEFAULT_USER));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (username: string, password: string, email: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would send this to your backend
    const newUser: User = { 
      id: Date.now().toString(), // Generate a unique ID
      username, 
      name, 
      email 
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}