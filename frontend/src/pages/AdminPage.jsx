import { useState, useEffect } from "react";
import client from "../api/client";


export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // fetch all users from the backend
  async function loadUsers() {
    setError(null);
    try {
      const response = await client.get("/admin/users");
      setUsers(response.data);
    } catch (err) {
      setError("Could not load users. Admin access required.");
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleChangeRole(email, currentRole) {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      await client.patch(`/admin/users/${email}/role`, { role: newRole });
      loadUsers(); // refresh the list
    } catch (err) {
      setError("Could not update role.");
    }
  }

  async function handleDelete(email) {
    try {
      await client.delete(`/admin/users/${email}`);
      loadUsers();
    } catch (err) {
      setError("Could not delete user.");
    }
  }

  return (
    <main>
      <h2>Admin Panel</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleChangeRole(u.email, u.role)}>
                  Make {u.role === "admin" ? "user" : "admin"}
                </button>
                <button onClick={() => handleDelete(u.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}