import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../../api';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const getTokenFromCookies = () => {
        const cookies = document.cookie.split(';');
        console.log(cookies)
        return cookies.find(cookie => cookie.trim().startsWith('token'));
      };

      const waitForToken = async (retries = 5, delay = 500) => {
        for (let i = 0; i < retries; i++) {
          const tokenCookie = getTokenFromCookies();
          if (tokenCookie) {
            return tokenCookie;
          }
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        return null;
      };

      const tokenCookie = await waitForToken();

      if (!tokenCookie) {
        console.log('No token found in cookies');
        setIsAuthenticated(false);
        navigate('/');
        return;
      }

      // If token exists, proceed with verification
      try {
        const response = await api.get('/auth/verify', { withCredentials: true });
        if (response.data.status) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate('/');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        navigate('/');
      }
    };

    checkAuth();
    setTimeout(() => {
      const cookies = document.cookie.split(';');
      console.log(cookies)
    }, 5000);

  }, [navigate]);

  if (isAuthenticated === null) {
    // Optionally, you can return a loading spinner or some placeholder here
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;