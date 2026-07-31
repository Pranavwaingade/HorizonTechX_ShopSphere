import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import ChangePassword from "./pages/ChangePassword";

import AdminDashboard from "./pages/AdminDashboard";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>

          <Routes>

            {/* USER ROUTES */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<UserProfile />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<MyOrders />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
            </Route>

            {/* AUTH ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ADMIN ROUTES */}
            <Route element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/products/new" element={<AdminAddProduct />} />
                <Route path="/admin/products/edit/:id" element={<AdminEditProduct />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
              </Route>
            </Route>
          </Routes>

        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;