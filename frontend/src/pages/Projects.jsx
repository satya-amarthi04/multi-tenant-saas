import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../services/projectService";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const res = await getProjects();
    setProjects(res.data.data || []);
  };

  const handleDelete = async (id) => {
    await deleteProject(id);
    loadProjects();
  };

  return (
    <div>
      <h2>Projects</h2>

      {projects.length === 0 && <p>No projects found</p>}

      <ul>
        {projects.map((p) => (
          <li key={p._id}>
            {p.name}
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
