import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved auth token on load
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchAuthUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchAuthUser = async (token) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Auth error:', error);
      localStorage.removeItem('authToken');
    }
    setLoading(false);
  };

  const login = async (username, password) => {
    try {
      console.log('Attempting login with:', { username, password }); // Debug

      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username,
          password,
          expiresInMins: 60
        })
      });
      
      const data = await response.json();
      console.log('Login response:', data); // Debug response

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        setUser(data);
        return { success: true, user: data };
      } else {
        console.error('Login failed:', data);
        return { 
          success: false, 
          error: data.message || 'Invalid credentials. Please try again.' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'Login failed. Please check your connection and try again.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
