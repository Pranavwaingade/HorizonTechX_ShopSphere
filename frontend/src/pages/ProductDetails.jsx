import { useParams, Link, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main className="product-not-found">
        <h2>Product Not Found</h2>
        <Link to="/products">Back to Products</Link>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <main className="product-details-page">
      <div className="product-details-container">

        <div className="product-details-image">
          <img src={product.image} alt={product.name} />
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

          <div className="details-actions">
            <button
              className="add-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
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