// context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('unimind_user');
    const savedHistory = localStorage.getItem('unimind_history');
    if (savedUser && !isGuest) {
      setUser(JSON.parse(savedUser));
    }
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  const login = (userData, guest = false) => {
    setUser(userData);
    setIsGuest(guest);
    if (!guest) {
      localStorage.setItem('unimind_user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('unimind_user');
    if (!isGuest) {
      localStorage.removeItem('unimind_history');
    }
  };

  const saveChatHistory = (messages) => {
    if (!isGuest && user) {
      setChatHistory(messages);
      localStorage.setItem('unimind_history', JSON.stringify(messages));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isGuest, login, logout, chatHistory, saveChatHistory }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}