import API from "./api";

// Get all projects (tenant resolved from token)
export const getProjects = async (tenantId) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`/api/tenants/${tenantId}/projects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.data; // 👈 IMPORTANT
};


// Get single project
export const getProjectById = (projectId) => {
  return API.get(`/projects/${projectId}`);
};

// Create project
export const createProject = (data) => {
  return API.post("/projects", data);
};

// Update project
export const updateProject = (id, data) => {
  return API.put(`/projects/${id}`, data);
};

// Delete project
export const deleteProject = (id) => {
  return API.delete(`/projects/${id}`);
};
