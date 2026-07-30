import products from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Products.css";

function Products() {
  return (
    <main className="products-page">
      <div className="products-container">

        <div className="products-header">
          <h1>All Products</h1>
          <p>Explore our latest products</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </main>
  );
}

export default Products;