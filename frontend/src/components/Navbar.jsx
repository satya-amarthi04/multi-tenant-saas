import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/projects">Projects</Link>

      {user.role === 'tenant_admin' && <Link to="/users">Users</Link>}

      <span>{user.email} ({user.role})</span>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
