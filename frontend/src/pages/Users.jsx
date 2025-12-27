import { useEffect, useState } from 'react';
import { getTenantUsers, addUser, updateUser, deleteUser } from '../services/userService';
import UserModal from '../components/UserModal';
import { useAuth } from '../context/AuthContext';

export default function Users() {
  const auth = useAuth();
  const user = auth?.user;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState('');

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getTenantUsers(user.tenantId);
      const list = Array.isArray(res.data)
      ? res.data
      : res.data?.data || [];
      setUsers(list);

    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);

  // Add or Update User
  const handleSave = async (formData) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, formData);
      } else {
        await addUser(user.tenantId, formData);
      }
      setModalOpen(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Filter users by search
  const filteredUsers = Array.isArray(users)
  ? users.filter(u =>
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    )
  : [];


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => { setSelectedUser(null); setModalOpen(true); }}
        >
          Add User
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />

      {loading ? <p>Loading...</p> : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Full Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(u => (
              <tr key={u.id}>
                <td className="border px-4 py-2">{u.full_name}</td>
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2">{u.role}</td>
                <td className="border px-4 py-2">{u.is_active ? 'Active' : 'Inactive'}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button className="bg-yellow-400 px-2 py-1 rounded" onClick={() => { setSelectedUser(u); setModalOpen(true); }}>Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && <tr><td colSpan="5" className="text-center p-4">No users found</td></tr>}
          </tbody>
        </table>
      )}

      <UserModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        userData={selectedUser}
      />
    </div>
  );
}

