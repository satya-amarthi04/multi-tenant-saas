import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await API.post('/auth/register-tenant', form);
    navigate('/login');
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Org Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Subdomain" onChange={e => setForm({ ...form, subdomain: e.target.value })} />
      <input placeholder="Admin Email" onChange={e => setForm({ ...form, adminEmail: e.target.value })} />
      <input placeholder="Full Name" onChange={e => setForm({ ...form, fullName: e.target.value })} />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <input placeholder="Confirm Password" type="Confirm password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button>Register</button>
    </form>
  );
}
