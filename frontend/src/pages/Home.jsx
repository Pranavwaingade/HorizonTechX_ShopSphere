import "./Home.css";

function Home() {
  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">Welcome to ShopSphere</span>

          <h1>
            Everything You Need,
            <span> All in One Place.</span>
          </h1>

          <p>
            Discover quality products at great prices.
            Shop easily, securely, and confidently.
          </p>

          <button className="hero-btn">
            Shop Now
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="section-heading">
          <h2>Shop by Category</h2>
          <p>Explore our popular categories</p>
        </div>

        <div className="category-grid">
          <div className="category-card">Electronics</div>
          <div className="category-card">Fashion</div>
          <div className="category-card">Home & Living</div>
          <div className="category-card">Accessories</div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-heading">
          <h2>Featured Products</h2>
          <p>Our popular products for you</p>
        </div>

        <div className="featured-grid">
          <div className="product-placeholder">Product 1</div>
          <div className="product-placeholder">Product 2</div>
          <div className="product-placeholder">Product 3</div>
          <div className="product-placeholder">Product 4</div>
        </div>
      </section>

    </main>
  );
}

export default Home;