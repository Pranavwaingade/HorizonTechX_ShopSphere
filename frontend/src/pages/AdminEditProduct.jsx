import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./AdminProductForm.css";

function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
    stock: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        const product = response.data;

        setFormData({
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          description: product.description,
          stock: product.stock,
        });
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      await api.put(`/products/${id}`, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });
      toast.success("Product updated successfully ✏️");
      navigate("/admin");
    } catch (error) {
      const message= error.response?.data?.message ||"Failed to update product"
        toast.error(message);
    
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <h2 className="admin-message">
        Loading product...
      </h2>
    );
  }

  return (
    <main className="admin-form-page">
      <div className="admin-form-container">
        <h1>Edit Product</h1>
        <p>Update product information.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="url"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Product description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            required
          />

          {error && (
            <p className="form-error">{error}</p>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/admin")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AdminEditProduct;