import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import "./OrderDetails.css";

const trackingSteps = [
  "Placed",
  "Confirmed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load order"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <h2 className="order-details-message">
        Loading order...
      </h2>
    );
  }

  if (error) {
    return (
      <div className="order-details-message">
        <h2>{error}</h2>

        <Link to="/orders">
          Back to My Orders
        </Link>
      </div>
    );
  }

  const currentStep = trackingSteps.indexOf(
    order.orderStatus
  );

  return (
    <main className="order-details-page">
      <div className="order-details-container">

        <Link
          to="/orders"
          className="back-orders"
        >
          ← Back to My Orders
        </Link>

        <div className="order-details-header">
          <div>
            <h1>
              Order #{order._id.slice(-8)}
            </h1>

            <p>
              Placed on{" "}
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

          <span className="order-current-status">
            {order.orderStatus}
          </span>
        </div>

        {/* Products */}

        <section className="order-section">
          <h2>Products</h2>

          <div className="order-items">
            {order.items.map((item) => (
              <div
                className="order-item"
                key={item.product?._id || item.product}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="order-item-info">
                  <h3>{item.name}</h3>

                  <p>
                    Qty: {item.quantity}
                  </p>
                </div>

                <strong>
                  ₹{item.price * item.quantity}
                </strong>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping */}

        <section className="order-section">
          <h2>Shipping Address</h2>

          <div className="shipping-info">
            <p>
              <strong>
                {order.shippingAddress.fullName}
              </strong>
            </p>

            <p>
              {order.shippingAddress.phone}
            </p>

            <p>
              {order.shippingAddress.address}
            </p>

            <p>
              {order.shippingAddress.city},{" "}
              {order.shippingAddress.state} -{" "}
              {order.shippingAddress.pincode}
            </p>
          </div>
        </section>

        {/* Summary */}

        <section className="order-section">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{order.subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>
              ₹{order.deliveryCharge}
            </span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>
              ₹{order.totalAmount}
            </strong>
          </div>

          <div className="payment-info">
            <p>
              <strong>Payment:</strong>{" "}
              {order.paymentMethod}
            </p>

            <p>
              <strong>Payment Status:</strong>{" "}
              {order.paymentStatus}
            </p>
          </div>
        </section>

        {/* Tracking */}

        <section className="order-section">
          <h2>Order Tracking</h2>

          <div className="tracking-timeline">
            {trackingSteps.map((step, index) => {
              const completed =
                index <= currentStep;

              return (
                <div
                  className={`tracking-step ${
                    completed
                      ? "completed"
                      : ""
                  }`}
                  key={step}
                >
                  <div className="tracking-dot">
                    {completed ? "✓" : ""}
                  </div>

                  <div>
                    <h3>{step}</h3>

                    {index ===
                      currentStep && (
                      <p>
                        Current status
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </main>
  );
}

export default OrderDetails;