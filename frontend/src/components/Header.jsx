import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="app-header">
      <div className="brand">
        <h1>Resume Evaluator</h1>
      </div>

      <nav className="nav-actions">
        {user ? (
          <>
            <span className="user-pill">{user.email}</span>

            {user.role === "admin" && (
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            )}

            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>

            <Link className="nav-link" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}