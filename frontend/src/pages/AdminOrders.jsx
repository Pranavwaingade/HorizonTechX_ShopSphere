import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import "./AdminOrders.css";

const orderStatuses = [
  "Placed",
  "Confirmed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/admin/all");
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await api.put(
        `/orders/admin/${orderId}/status`,
        {
          orderStatus: newStatus,
        }
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? response.data.order
            : order
        )
      );
      toast.success("Order status updated");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update order status"
      );
    }
  };

  if (loading) {
    return (
      <h2 className="admin-orders-message">
        Loading orders...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="admin-orders-message">
        {error}
      </h2>
    );
  }

  return (
    <main className="admin-orders-page">
      <div className="admin-orders-container">

        <div className="admin-orders-header">
          <h1>Order Management</h1>
          <p>Manage customer orders and update status.</p>
        </div>

        <div className="admin-orders-table-wrapper">
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    #{order._id.slice(-8)}
                  </td>

                  <td>
                    <div>
                      <strong>
                        {order.user?.name}
                      </strong>

                      <p>
                        {order.user?.email}
                      </p>
                    </div>
                  </td>

                  <td>
                    ₹{order.totalAmount}
                  </td>

                  <td>
                    <span className="payment-status">
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td>
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }
                    >
                      {orderStatuses.map((status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}

export default AdminOrders;