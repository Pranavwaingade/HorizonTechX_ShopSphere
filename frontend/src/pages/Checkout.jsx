import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, cartTotal } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deliveryCharge = 0;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id || item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      const response = await api.post("/orders", {
        items: orderItems,
        shippingAddress: formData,
        subtotal: cartTotal,
        deliveryCharge,
        totalAmount: cartTotal + deliveryCharge,
        paymentMethod,
      });

      navigate(`/orders/${response.data.order._id}`);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="checkout-page">
      <div className="checkout-container">

        <div className="checkout-form">
          <h1>Checkout</h1>

          <form onSubmit={handlePlaceOrder}>

            <h2>Shipping Address</h2>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />

            <h2>Payment Method</h2>

            <label className="payment-option">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              Cash on Delivery
            </label>

            <label className="payment-option">
              <input
                type="radio"
                value="ONLINE"
                checked={paymentMethod === "ONLINE"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              Online Payment
            </label>

            {error && (
              <p className="checkout-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </form>
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div
              className="checkout-item"
              key={item.id || item._id}
            >
              <div>
                <strong>{item.name}</strong>
                <p>
                  Qty: {item.quantity}
                </p>
              </div>

              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}

          <hr />

          <div className="checkout-total">
            <span>Total</span>
            <strong>₹{cartTotal}</strong>
          </div>
        </div>

      </div>
    </main>
  );
}

export default Checkout;