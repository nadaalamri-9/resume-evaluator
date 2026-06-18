import { useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const response = await client.post("/auth/login", { email, password });
      const token = response.data.access_token;

      // store the token first so the interceptor can attach it to /me
      localStorage.setItem("token", token);

      // ask the backend who we are (returns email + role)
      const me = await client.get("/auth/me");

      login(email, token, me.data.role);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password.");
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
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

          <button type="submit">Login</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  );
}

