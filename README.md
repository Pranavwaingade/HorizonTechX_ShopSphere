# ShopSphere 🛒

A full-stack MERN e-commerce application with customer shopping features, JWT authentication, product management, order placement, order tracking, and a secure admin dashboard.

## Project Overview

ShopSphere is a modern e-commerce web application built using the MERN stack.

Customers can register, log in, browse products, add products to a cart, complete checkout, place orders, view their orders, and track order status.

Admins have a separate protected dashboard to manage products and customer orders.

## Features

### 👤 User Features

- User registration and login
- JWT-based authentication
- Persistent login after page refresh
- Logout functionality
- Product listing
- Product details
- Add to cart
- Increase/decrease product quantity
- Remove products from cart
- Checkout with shipping address
- Cash on Delivery / Online Payment selection
- Place orders
- View My Orders
- View Order Details
- Order tracking timeline
- Product stock reduction after successful order

### 🔐 Admin Features

- Separate admin authentication using role-based access
- Protected admin routes
- Separate admin navigation
- Admin dashboard
- Create products
- Update products
- Delete products
- View all customer orders
- Update order status
- Manage product stock
- Normal users are blocked from admin APIs

## Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

## Project Structure

```text
ShopSphere/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Authentication & Security

ShopSphere uses JWT authentication for protected API access.

- Passwords are hashed using bcryptjs.
- JWT tokens are used for authenticated requests.
- Axios automatically attaches the JWT token to protected API requests.
- Admin routes use role-based authorization.
- Only users with the `admin` role can access admin product and order management APIs.
- Environment variables are used for sensitive configuration.
- `.env` files are excluded from Git using `.gitignore`.

## Main API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

Admin authentication is required for product creation, updating, and deletion.

### Orders

```text
POST /api/orders
GET  /api/orders/my-orders
GET  /api/orders/:id

GET /api/orders/admin/all
PUT /api/orders/admin/:id/status
```

The admin endpoints require an authenticated admin user.

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd ShopSphere
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_JWT_SECRET
```

Start backend:

```bash
npm run dev
```

## Environment Variables

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_JWT_SECRET
```

Do not commit real secrets or `.env` files to GitHub.

## Application Flow

```text
Register
   ↓
Login
   ↓
JWT Authentication
   ↓
Products
   ↓
Product Details
   ↓
Add to Cart
   ↓
Checkout
   ↓
Place Order
   ↓
MongoDB Order
   ↓
My Orders
   ↓
Order Details
   ↓
Order Tracking
```

### Admin Flow

```text
Admin Login
   ↓
Admin Dashboard
   ↓
Manage Products
   ├── Create
   ├── Update
   └── Delete
   ↓
Manage Orders
   ↓
Update Order Status
   ↓
Customer Tracking Timeline
```

## Order Status Flow

```text
Placed
   ↓
Confirmed
   ↓
Processing
   ↓
Shipped
   ↓
Out for Delivery
   ↓
Delivered
```

An order can also be cancelled when applicable.

## Database Models

### User

```text
name
email
password
role
createdAt
updatedAt
```

### Product

```text
name
category
price
image
description
stock
createdAt
updatedAt
```

### Order

```text
user
items
shippingAddress
subtotal
deliveryCharge
totalAmount
paymentMethod
paymentStatus
orderStatus
createdAt
updatedAt
```

## Screenshots

Add screenshots of the main application pages here before publishing:

- Home Page
- Product Listing
- Product Details
- Cart
- Checkout
- Login / Register
- My Orders
- Order Tracking
- Admin Dashboard
- Admin Product Management
- Admin Order Management

Example:

```markdown
![Home Page](./screenshots/home.png)
```

## Future Improvements

- Payment gateway integration
- Product search and advanced filtering
- Product reviews and ratings
- Wishlist
- Coupon and discount system
- Email notifications
- Admin analytics dashboard
- Cloud image storage
- Production deployment and monitoring

## Developer

**Pranav Waingade**

MERN Stack Developer

## License

This project was created for learning, portfolio development, and internship purposes.
