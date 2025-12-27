import { useState } from 'react';
import { createProject, updateProject } from '../services/projectService';

export default function ProjectModal({ project, onClose }) {
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [status, setStatus] = useState(project?.status || 'active');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (project) {
        await updateProject(project.id, { name, description, status });
      } else {
        await createProject({ name, description, status });
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">{project ? 'Edit Project' : 'Create Project'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block mb-1">Name</label>
            <input className="w-full border p-2" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Description</label>
            <textarea className="w-full border p-2" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Status</label>
            <select className="w-full border p-2" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end mt-4">
            <button type="button" className="mr-2" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
