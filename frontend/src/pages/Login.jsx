import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await API.post('/auth/login', { email, password, subdomain });
    localStorage.setItem('token', res.data.data.token);
    navigate('/dashboard');
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <input placeholder="Tenant Subdomain" onChange={e => setSubdomain(e.target.value)} />
      <button>Login</button>
    </form>
  );
}
