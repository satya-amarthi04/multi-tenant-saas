import { useState } from 'react';
import API from '../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      subdomain,
      adminEmail,
      password,
      fullName,
    };

    console.log('Register Payload:', payload);

    try {
      const res = await API.post('/auth/register-tenant', payload);
      alert('Registered successfully!');
      console.log(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register Tenant</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Company Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />

        <input
          placeholder="Subdomain"
          value={subdomain}
          onChange={(e) => setSubdomain(e.target.value)}
        /><br />

        <input
          placeholder="Admin Email"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
        /><br />

        <input
          placeholder="Admin Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
