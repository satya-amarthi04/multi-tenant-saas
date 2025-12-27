import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProjectById } from '../services/projectService';
import { getTasksByProject } from '../services/taskService';

export default function ProjectDetails() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const projectRes = await getProjectById(projectId);
        setProject(projectRes.data?.data || projectRes.data);

        const tasksRes = await getTasksByProject(projectId);
        const taskList = Array.isArray(tasksRes.data)
          ? tasksRes.data
          : tasksRes.data?.data || [];
        setTasks(taskList);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchData();
  }, [projectId]);

  if (loading) return <p>Loading...</p>;
  if (!project) return <p>Project not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
      <p className="mb-4">{project.description}</p>

      <h2 className="text-xl font-bold mb-2">Tasks</h2>

      {tasks.length === 0 && <p>No tasks yet</p>}

      <ul>
        {tasks.map(task => (
          <li key={task.id} className="border p-2 mb-2 rounded">
            <p className="font-bold">{task.title}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Assigned To: {task.assignedUserName || 'Unassigned'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
