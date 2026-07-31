import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "Electronics",
    "Fashion",
    "Home Decor",
    "Accessories",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        setProducts(response.data.slice(0, 4));
      } catch (error) {
        console.error("Failed to load featured products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">
            Welcome to ShopSphere
          </span>

          <h1>
            Everything You Need,
            <span> All in One Place.</span>
          </h1>

          <p>
            Discover quality products at great prices.
            Shop easily, securely, and confidently.
          </p>

          <Link to="/products" className="hero-btn">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="section-heading">
          <h2>Shop by Category</h2>
          <p>Explore our popular categories</p>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to={`/products?category=${encodeURIComponent(
                category
              )}`}
              className="category-card"
              key={category}
            >
              <div className="category-icon">
                {category === "Electronics" && "📱"}
                {category === "Fashion" && "👕"}
                {category === "Home Decor" && "🏠"}
                {category === "Accessories" && "🎒"}
              </div>

              <h3>{category}</h3>

              <span>Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-heading">
          <h2>Featured Products</h2>
          <p>Our popular products for you</p>
        </div>

        {loading ? (
          <p className="home-loading">
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <p className="home-loading">
            No products available.
          </p>
        ) : (
          <div className="featured-grid">
            {products.map((product) => (
              <Link
                to={`/products/${product._id}`}
                className="featured-card"
                key={product._id}
              >
                <div className="featured-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <div className="featured-info">
                  <span>
                    {product.category}
                  </span>

                  <h3>{product.name}</h3>

                  <strong>
                    ₹{product.price}
                  </strong>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="featured-action">
          <Link
            to="/products"
            className="view-all-btn"
          >
            View All Products
          </Link>
        </div>
      </section>

    </main>
  );
}

export default Home;