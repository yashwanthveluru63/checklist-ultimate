import React, { createContext, useState, useContext, useEffect } from 'react';
import { getStoredContent, saveContent } from '../utils/localStorage';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      // const user = getStoredUser(); // User auth not implemented
  //     if (user) {
    //       setCurrentUser(user);
    //       setIsAuthenticated(true);
  //     }
    const storedContent = getStoredContent();
    setContent(storedContent);
  }, []);

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      setCurrentUser({ username });
      setIsAuthenticated(true);
      // saveUser({ username }); // User auth not implemented
      return true;
    }
    return false;
  };

  const signup = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.username === username)) {
      return false;
    }
    
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    setCurrentUser({ username });
    setIsAuthenticated(true);
    // saveUser({ username }); // User auth not implemented
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    //     clearUser(); // User auth not implemented
  };

  const addContent = (newContent) => {
    const contentWithId = {
      ...newContent,
      id: Date.now().toString(),
      date_added: new Date().toISOString(),
    };
    const updatedContent = [...content, contentWithId];
    setContent(updatedContent);
    saveContent(updatedContent);
    return contentWithId.id;
  };

  const updateContent = (id, updatedData) => {
    const updatedContent = content.map(item =>
      item.id === id ? { ...item, ...updatedData } : item
    );
    setContent(updatedContent);
    saveContent(updatedContent);
  };

  const deleteContent = (id) => {
    const updatedContent = content.filter(item => item.id !== id);
    setContent(updatedContent);
    saveContent(updatedContent);
  };

  const getContentById = (id) => {
    return content.find(item => item.id === id);
  };

  const getStats = () => {
    const movies = content.filter(item => item.type === 'movie').length;
    const series = content.filter(item => item.type === 'series').length;
    const finished = content.filter(item => item.status === 'finished').length;
    const watching = content.filter(item => item.status === 'watching').length;
    const toWatch = content.filter(item => item.status === 'to_watch').length;

    return {
      total: content.length,
      movies,
      series,
      finished,
      watching,
      toWatch,
    };
  };

  const value = {
    content,
    currentUser,
    isAuthenticated,
    login,
    signup,
    logout,
    addContent,
    updateContent,
    deleteContent,
    getContentById,
    getStats,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};
