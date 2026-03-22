import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://edubackend-56k8.onrender.com/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [streams, setStreams] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStreams();
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setUser(res.data)).catch(() => localStorage.removeItem('token'));
    }
    setLoading(false);
  }, []);

  const fetchStreams = async () => {
    try {
      const res = await axios.get(`${API_URL}/streams`);
      setStreams(res.data);
    } catch (err) {
      console.error('Failed to fetch streams:', err);
    }
  };

  return (
    <AppContext.Provider value={{ streams, setStreams, user, setUser, loading, API_URL }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
