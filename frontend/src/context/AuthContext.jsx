import { createContext, useContext, useState } from 'react';
import axios from 'axios';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  

  const signup = async (username, email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res; // Return the entire response for potential handling in components
    } catch (error) {
      console.error('Signup failed:', error);
      throw error; // Re-throw the error to be caught in components
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res; // Return the entire response for potential handling in components
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw the error to be caught in components
    }
  };

   
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



