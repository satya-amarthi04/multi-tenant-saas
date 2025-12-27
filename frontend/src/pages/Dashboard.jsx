import { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/authService';
import { getProjects } from '../services/projectService';
import { getMyTasks } from '../services/taskService';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const userRes = await getCurrentUser();
      const currentUser = userRes.data?.data || userRes.data;
      setUser(currentUser);


      const projectsRes = await getProjects(userRes.data.tenantId);
      const projectList = Array.isArray(projectsRes.data)
        ? projectsRes.data
        : projectsRes.data?.data || [];
      setProjects(projectList);

      const tasksRes = await getMyTasks(userRes.data.id);
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
}, []);


  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded">
          <p>Total Projects</p>
          <h2 className="text-xl font-bold">{projects.length}</h2>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <p>Total Tasks</p>
          <h2 className="text-xl font-bold">{tasks.length}</h2>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <p>Completed Tasks</p>
          <h2 className="text-xl font-bold">{tasks.filter(t => t.status === 'completed').length}</h2>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <p>Pending Tasks</p>
          <h2 className="text-xl font-bold">{tasks.filter(t => t.status !== 'completed').length}</h2>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Recent Projects</h2>
        <ul>
          {projects.slice(0, 5).map(p => (
            <li key={p.id} className="border p-2 mb-2 rounded">
              <p className="font-bold">{p.name}</p>
              <p>Status: {p.status}</p>
              <p>Task Count: {p.taskCount}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* My Tasks */}
      <div>
        <h2 className="text-xl font-bold mb-2">My Tasks</h2>
        <ul>
          {tasks.map(t => (
            <li key={t.id} className="border p-2 mb-2 rounded">
              <p className="font-bold">{t.title}</p>
              <p>Project: {t.projectName}</p>
              <p>Status: {t.status}</p>
              <p>Priority: {t.priority}</p>
              <p>Due: {new Date(t.dueDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
