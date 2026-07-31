import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

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
    <nav className="navbar">
      <div className="navbar-container">

        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          ShopSphere
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <div
          className={`nav-links ${
            menuOpen ? "active" : ""
          }`}
        >
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link
            to="/products"
            onClick={closeMenu}
          >
            Products
          </Link>

          <Link
            to="/cart"
            onClick={closeMenu}
          >
            Cart
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/orders"
                onClick={closeMenu}
              >
                My Orders
              </Link>

              <Link
                to="/account"
                onClick={closeMenu}
                className="user-name"
              >
                Hi, {user?.name}
              </Link>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;