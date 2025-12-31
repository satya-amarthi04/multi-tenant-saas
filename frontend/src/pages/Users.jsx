import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/userService";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data.data || []);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <div>
      <h2>Users</h2>

      {users.length === 0 && <p>No users found</p>}

      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.fullName} ({u.email})
            <button onClick={() => handleDelete(u._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
