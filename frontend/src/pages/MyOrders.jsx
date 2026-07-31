import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders/my-orders");
        setOrders(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load orders"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <h2 className="orders-message">Loading orders...</h2>;
  }

  if (error) {
    return <h2 className="orders-message">{error}</h2>;
  }

  if (orders.length === 0) {
    return (
      <main className="orders-page">
        <div className="orders-empty">
          <h1>No Orders Yet</h1>
          <p>You have not placed any orders.</p>

          <Link to="/products">
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <div className="orders-container">

        <div className="orders-header">
          <h1>My Orders</h1>
          <p>View your recent orders and track them.</p>
        </div>

        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>

              <div>
                <h3>Order #{order._id.slice(-8)}</h3>

                <p>
                  Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <p>
                  Items: {order.items.length}
                </p>
              </div>

              <div className="order-status">
                <span>{order.orderStatus}</span>

                <strong>
                  ₹{order.totalAmount}
                </strong>
              </div>

              <Link
                to={`/orders/${order._id}`}
                className="view-order-btn"
              >
                View Details
              </Link>

            </div>
          ))}
        </div>

      </div>
    </main>
  );
}

export default MyOrders;