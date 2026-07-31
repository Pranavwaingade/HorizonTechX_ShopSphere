import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AdminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">

        <Link
          to="/admin"
          className="admin-logo"
          onClick={closeMenu}
        >
          ShopSphere Admin
        </Link>

        <button
          className="admin-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle admin navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          className={`admin-nav-links ${
            menuOpen ? "active" : ""
          }`}
        >
          <Link
            to="/admin"
            onClick={closeMenu}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products/new"
            onClick={closeMenu}
          >
            Add Product
          </Link>

          <Link
            to="/admin/orders"
            onClick={closeMenu}
          >
            Orders
          </Link>

          <span className="admin-user">
            Hi, {user?.name}
          </span>

          <button
            className="admin-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}

export default AdminNavbar;