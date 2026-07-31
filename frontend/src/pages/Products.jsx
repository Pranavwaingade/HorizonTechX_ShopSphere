import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import api from "../services/api";
import "./Products.css";
import { Link, useSearchParams, } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/products", {
        params: category
          ? { category }
          : {},
      });

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

  fetchProducts();
}, [category]);
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await api.get("/products");
  //       setProducts(response.data);
  //     } catch (error) {
  //       setError("Failed to load products");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <main className="products-page">
      <div className="products-container">

        <div className="products-header">
          <h1>{category? `${category} Products`: "All Products"}</h1>
          <p>Explore our latest products</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={{
                ...product,
                id: product._id,
              }}
            />
          ))}
        </div>

      </div>
    </main>
  );
}

export default Products;