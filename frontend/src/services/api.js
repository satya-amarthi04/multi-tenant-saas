import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth APIs
export const loginUser = async (email, password) => {
  const res = await API.post('/auth/login', { email, password });
  return res.data; // { token: "..." }
};

export const registerUser = async (name, email, password) => {
  const res = await API.post('/auth/register', { name, email, password });
  return res.data;
};

// Users API
export const fetchUsers = async () => {
  const res = await API.get('/users');
  return res.data; // array of users
};

export default API;
