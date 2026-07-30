import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <span className="product-category">{product.category}</span>

        <h3>{product.name}</h3>

        <p className="product-price">₹{product.price}</p>

        <Link to={`/products/${product.id}`} className="view-product">
          View Product
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;