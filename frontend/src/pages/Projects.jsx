import { useEffect, useState } from 'react';
import { getProjects, deleteProject } from '../services/projectService';
import ProjectModal from '../components/ProjectModal';
import { useNavigate } from 'react-router-dom';


export default function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await getProjects(); // tenantId is handled in service
      const projectList = Array.isArray(res.data)
      ? res.data
      : res.data?.data || [];

    setProjects(projectList);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
      fetchProjects();
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setModalOpen(true)}
      >
        Create New Project
      </button>

      {/* Projects Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Task Count</th>
            <th className="border p-2">Created At</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td className="border p-2 text-blue-600 cursor-pointer"
                onClick={() => navigate(`/projects/${p.id}`)}
              >
                {p.name}
              </td>

              <td className="border p-2">{p.status}</td>
              <td className="border p-2">{p.taskCount}</td>
              <td className="border p-2">{new Date(p.createdAt).toLocaleDateString()}</td>
              <td className="border p-2">
                <button className="text-blue-500 mr-2" onClick={() => handleEdit(p)}>Edit</button>
                <button className="text-red-500" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <ProjectModal
          project={editingProject}
          onClose={() => { setModalOpen(false); setEditingProject(null); fetchProjects(); }}
        />
      )}
    </div>
  );
}
