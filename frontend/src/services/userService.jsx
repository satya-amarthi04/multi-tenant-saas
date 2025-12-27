import API from './api';

// Auth APIs
export const loginUser = (email, password) => API.post('/auth/login', { email, password });
export const registerUser = (name, email, password) => API.post('/auth/register', { name, email, password });

// Tenant Users APIs
export const getTenantUsers = (tenantId) => API.get(`/tenants/${tenantId}/users`);
export const addUser = (tenantId, userData) => API.post(`/tenants/${tenantId}/users`, userData);
export const updateUser = (userId, userData) => API.put(`/users/${userId}`, userData);
export const deleteUser = (userId) => API.delete(`/users/${userId}`);
