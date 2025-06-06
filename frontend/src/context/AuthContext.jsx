// // src/context/AuthContext.jsx
// import { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = Bearer `${token}`;
//       fetchUser();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get('/api/users/me');
//       setCurrentUser(res.data);
//     } catch (error) {
//       localStorage.removeItem('token');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post('/api/auth/login', { email, password });
//       localStorage.setItem('token', res.data.token);
//       axios.defaults.headers.common['Authorization'] = Bearer `${res.data.token}`;
//       await fetchUser();
//       return true;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Login failed');
//     }
//   };

//   const register = async (userData) => {
//     try {
//       const res = await axios.post('/api/auth/register', userData);
//       localStorage.setItem('token', res.data.token);
//       axios.defaults.headers.common['Authorization'] = Bearer `${res.data.token}`;
//       await fetchUser();
//       return true;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Registration failed');
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     delete axios.defaults.headers.common['Authorization'];
//     setCurrentUser(null);
//   };

//   const value = {
//     currentUser,
//     loading,
//     login,
//     register,
//     logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };





// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/users/me');
      setCurrentUser(res.data);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      await fetchUser();
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post('/api/auth/register', userData);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      await fetchUser();
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};