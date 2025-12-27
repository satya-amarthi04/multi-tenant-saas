import { useState } from 'react';
import API from '../services/api';

export default function UserModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ full_name: '', email: '', password: '', role: 'user', is_active: true });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/tenants/36a760bf-975c-4060-a1d3-719b07ec50b6/users', form);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input placeholder="Full Name" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="user">User</option>
          <option value="tenant_admin">Tenant Admin</option>
        </select>
        <label>
          <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} />
          Active
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
