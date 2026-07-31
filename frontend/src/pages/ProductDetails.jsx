import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        setProduct(response.data);
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

  const handleAddToCart = () => {
    addToCart({
      ...product,
      id: product._id,
    });

    navigate("/cart");
  };

  if (loading) {
    return (
      <main className="product-not-found">
        <h2>Loading product...</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main className="product-not-found">
        <h2>{error}</h2>

        <Link to="/products">
          Back to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="product-details-page">
      <div className="product-details-container">

        <div className="product-details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="product-details-info">

          <span className="details-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p className="details-price">
            ₹{product.price}
          </p>

          <p className="details-description">
            {product.description}
          </p>

          <p>
            <strong>Stock:</strong> {product.stock}
          </p>

          <div className="details-actions">

            <button
              className="add-cart-btn"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              {product.stock > 0
                ? "Add to Cart"
                : "Out of Stock"}
            </button>

            <Link
              to="/products"
              className="back-products-btn"
            >
              Continue Shopping
            </Link>

          </div>

        </div>
      </div>
    </main>
  );
}

export default ProductDetails;