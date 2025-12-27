import axios from 'axios';

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  return axios.get('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
};
