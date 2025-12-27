import { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/taskService';
import { getTenantUsers } from '../services/userService';

export default function TaskModal({ projectId, task, onClose }) {
  const [title, setTitle] = useState(task?.title || '');
  const [priority, setPriority] = useState(task?.priority || 'medium');
  const [status, setStatus] = useState(task?.status || 'todo');
  const [assignedUser, setAssignedUser] = useState(task?.assignedUserId || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await getTenantUsers();
      setUsers(res.data);
    }
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, priority, status, assignedUserId: assignedUser, dueDate };
    try {
      if (task) {
        await updateTask(task.id, data);
      } else {
        await createTask(projectId, data);
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">{task ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Title</label>
            <input className="w-full border p-2" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label>Priority</label>
            <select className="w-full border p-2" value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-2">
            <label>Status</label>
            <select className="w-full border p-2" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="mb-2">
            <label>Assign User</label>
            <select className="w-full border p-2" value={assignedUser} onChange={e => setAssignedUser(e.target.value)}>
              <option value="">Unassigned</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.full_name}</option>)}
            </select>
          </div>
          <div className="mb-2">
            <label>Due Date</label>
            <input type="date" className="w-full border p-2" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          </div>
          <div className="flex justify-end mt-4">
            <button type="button" className="mr-2" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {task ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
