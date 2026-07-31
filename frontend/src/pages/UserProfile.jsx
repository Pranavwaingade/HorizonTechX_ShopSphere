import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./UserProfile.css";

function UserProfile() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders/my-orders");

        setOrders(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load order history"
        );
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="profile-page">
      <div className="profile-container">

        <div className="profile-header">
          <div>
            <h1>My Account</h1>
            <p>Manage your profile and orders</p>
          </div>

          <button
            className="profile-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Profile Information */}

        <section className="profile-card">
          <h2>Profile Information</h2>

          <div className="profile-info">
            <div>
              <span>Name</span>
              <strong>{user?.name}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{user?.email}</strong>
            </div>

            <div>
              <span>Account Type</span>
              <strong>
                {user?.role === "admin"
                  ? "Administrator"
                  : "User"}
              </strong>
            </div>
          </div>
        </section>

        {/* Security */}

        <section className="profile-card">
          <h2>Security</h2>

          <div className="password-row">
            <div>
              <span>Password</span>
              <strong>••••••••</strong>
            </div>

            <Link
              to="/change-password"
              className="change-password-btn"
            >
              Change Password
            </Link>
          </div>
        </section>

        {/* Orders */}

        <section className="profile-card">
          <div className="orders-section-header">
            <div>
              <h2>Order History</h2>
              <p>Your recent orders</p>
            </div>

            <Link to="/orders">
              View All
            </Link>
          </div>

          {loadingOrders ? (
            <p className="profile-message">
              Loading orders...
            </p>
          ) : error ? (
            <p className="profile-error">
              {error}
            </p>
          ) : orders.length === 0 ? (
            <div className="no-orders">
              <p>You haven't placed any orders yet.</p>

              <Link to="/products">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="profile-orders">
              {orders.slice(0, 5).map((order) => (
                <div
                  className="profile-order"
                  key={order._id}
                >
                  <div>
                    <h3>
                      Order #{order._id.slice(-8)}
                    </h3>

                    <p>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>

                    <p>
                      {order.items.length} item
                      {order.items.length > 1
                        ? "s"
                        : ""}
                    </p>
                  </div>

                  <div className="profile-order-right">
                    <span className="profile-order-status">
                      {order.orderStatus}
                    </span>

                    <strong>
                      ₹{order.totalAmount}
                    </strong>

                    <Link
                      to={`/orders/${order._id}`}
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

export default UserProfile;