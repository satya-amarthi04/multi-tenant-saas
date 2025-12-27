import axios from 'axios';

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
});

/**
 * Get all tasks of a project
 */
export const getTasksByProject = async (projectId) => {
  const res = await axios.get(`/api/projects/${projectId}/tasks`, {
    headers: getAuthHeader()
  });

  // ✅ ALWAYS return array
  return Array.isArray(res.data?.data) ? res.data.data : [];
};

/**
 * Get tasks assigned to logged-in user
 */
export const getMyTasks = async (userId) => {
  const res = await axios.get(`/api/users/${userId}/tasks`, {
    headers: getAuthHeader()
  });

  return Array.isArray(res.data?.data) ? res.data.data : [];
};

/**
 * Create task under a project
 */
export const createTask = async (projectId, data) => {
  const res = await axios.post(`/api/projects/${projectId}/tasks`, data, {
    headers: getAuthHeader()
  });

  return res.data;
};

/**
 * Update task
 */
export const updateTask = async (taskId, data) => {
  const res = await axios.put(`/api/tasks/${taskId}`, data, {
    headers: getAuthHeader()
  });

  return res.data;
};

/**
 * Delete task
 */
export const deleteTask = async (taskId) => {
  const res = await axios.delete(`/api/tasks/${taskId}`, {
    headers: getAuthHeader()
  });

  return res.data;
};
