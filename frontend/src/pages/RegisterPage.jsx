import { useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await client.post("/auth/register", { email, password });

      const response = await client.post("/auth/login", { email, password });
      const token = response.data.access_token;

      localStorage.setItem("token", token);

      const me = await client.get("/auth/me");

      login(email, token, me.data.role);
      navigate("/");
    } 
    catch (err) {
    setError(
      err.response?.data?.detail || "Registration failed. Please try again."
    );
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">Register</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <p>Already have an account?<Link to="/login">Login</Link></p>
      </div>
    </main>
  );
}