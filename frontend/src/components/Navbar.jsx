import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: 15, background: '#222', color: '#fff' }}>
      <span style={{ marginRight: 20 }}>Multi-tenant-saas</span>

      <Link to="/" style={{ marginRight: 10 }}>Home</Link>

      {!user && (
        <>
          <Link to="/register" style={{ marginRight: 10 }}>SignUp</Link>
          <Link to="/login">Login</Link>
        </>
      )}

      {user && (
        <>
          <Link to="/dashboard" style={{ marginRight: 10 }}>Dashboard</Link>
          <Link to="/users" style={{ marginRight: 10 }}>Users</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}
