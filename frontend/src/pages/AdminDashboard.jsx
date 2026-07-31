import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/products/${id}`);

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product._id !== id
        )
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete product"
      );
    }
  };

  if (loading) {
    return (
      <h2 className="admin-message">
        Loading products...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="admin-message">
        {error}
      </h2>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-container">

        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage your ShopSphere products</p>
          </div>

          <Link
            to="/admin/products/new"
            className="add-product-btn"
          >
            + Add Product
          </Link>
          <Link
            to="/admin/orders"
            className="orders-btn add-product-btn"
          >
            Manage Orders
          </Link>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="product-cell">
                      <img
                        src={product.image}
                        alt={product.name}
                      />

                      <span>{product.name}</span>
                    </div>
                  </td>

                  <td>{product.category}</td>

                  <td>₹{product.price}</td>

                  <td>{product.stock}</td>

                  <td>
                    <div className="admin-actions">
                      <Link
                        to={`/admin/products/edit/${product._id}`}
                        className="edit-btn"
                      >
                        Edit
                      </Link>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(product._id)
                        }
                      >
                        Delete
                      </button>
                    </div>
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

export default AdminDashboard;