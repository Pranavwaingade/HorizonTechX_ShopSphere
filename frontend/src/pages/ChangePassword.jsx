import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import "./ChangePassword.css";

function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await api.put(
        "/auth/change-password",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }
      );

      setMessage(response.data.message);
      toast.success("Password updated successfully 🔒");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/account");
      }, 1200);
    } catch (error) {
      const message = error.response?.data?.message || "Failed to change password"
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="change-password-page">
      <div className="change-password-container">
        <h1>Change Password</h1>
        <p>Update your account password securely.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="currentPassword"
            placeholder="Current password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {message && (
            <p className="change-password-success">
              {message}
            </p>
          )}

          {error && (
            <p className="change-password-error">
              {error}
            </p>
          )}

          <div className="change-password-actions">
            <button
              type="button"
              className="change-password-cancel"
              onClick={() => navigate("/account")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="change-password-submit"
              disabled={loading}
            >
              {loading
                ? "Updating..."
                : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default ChangePassword;
