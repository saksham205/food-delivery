# 🍔 Foodie - Food Delivery Web Application
Foodie is a full-stack food delivery web application where users can browse food items, search and filter the menu, add food to cart, place orders, and track their order status.

The project also includes an Admin Panel for managing food items, customer orders, order status, and sales statistics.

## 🚀 Features
### 👤 Customer Features

- User Registration
- User Login and Logout
- JWT Authentication
- Browse Food Items
- Search Food
- Category Filtering
- Food Details
- Add to Cart
- Increase / Decrease Quantity
- Remove Items from Cart
- Checkout
- Delivery Address
- COD / UPI Payment Selection
- Place Order
- My Orders
- Order Status Tracking

### 🔐 Admin Features

- Admin Login
- Protected Admin Routes
- Admin Dashboard
- Total Orders
- Total Users
- Total Sales
- Pending Orders
- Recent Orders
- Sales Chart
- View All Customer Orders
- Search Orders
- Filter Orders by Status
- Update Order Status
- Add Food
- Edit Food
- Delete Food
- Manage Food

## 🛠️ Technologies Used

### Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Lucide React
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- dotenv
- Nodemon

## 🏗️ Project Architecture

```text
Customer
   ↓
React Frontend
   ↓
Axios API Requests
   ↓
Node.js + Express Backend
   ↓
MongoDB Database


## 📁 Project Structure

```text
food/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Food.js
│   │   └── Order.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── foodRoutes.js
│   │   ├── orderRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── food-delivery/
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── App.jsx
│       │   └── index.css
│       │
│       ├── package.json
│       └── vite.config.js
│
├── README.md
└── .gitignore

## ⚙️ Installation

### Backend Setup

```bash
cd backend
npm install
npm run dev
Backend runs on: http://localhost:5001

## ⚙️ Frontend Setup
Open another terminal:
cd food-delivery/frontend
npm install
npm run dev
Frontend runs on:http://localhost:5174

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001


## 🔑 Authentication & Authorization

The application uses JWT-based authentication.

### Normal User

Normal users can:

- Browse food
- Search and filter food
- Add food to cart
- Place orders
- Track their orders

### Admin

Admin users have:

```text
role = admin


## 📦 Order Workflow

```text
Placed
   ↓
Preparing
   ↓
Out for Delivery
   ↓
Delivered



## 🗄️ Database Models

### User

Stores:
- Name
- Email
- Password
- Role

### Food

Stores:
- Name
- Description
- Price
- Rating
- Category
- Image

### Order

Stores:
- User
- Items
- Customer Details
- Subtotal
- Delivery Fee
- Total
- Payment Method
- Status


## 🔌 API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login

Food
GET    /api/food
GET    /api/food/:id
POST   /api/food
PUT    /api/food/:id
DELETE /api/food/:id


Orders
POST /api/orders
GET  /api/orders/my-orders
GET  /api/orders/admin/all
PUT  /api/orders/:id/status

Admin
GET /api/admin/stats


## 🛒 Customer Flow

```text
Home
 ↓
Menu
 ↓
Food Details
 ↓
Add to Cart
 ↓
Cart
 ↓
Checkout
 ↓
Place Order
 ↓
My Orders
 ↓
Track Order

## 👨‍💼 Admin Flow

```text
Admin Login
   ↓
Admin Dashboard
   ├── Orders
   ├── Add Food
   ├── Manage Food
   └── Edit Food
   
   ## 🔎 Admin Order Management

Admins can:

- View all customer orders
- Search by customer name
- Search by phone number
- Search by order ID
- Filter orders by status
- Update order status
- View customer delivery details
- View payment method
- View total amount



## 📊 Admin Dashboard

The Admin Dashboard displays:

- Total Orders
- Total Users
- Total Sales
- Pending Orders
- Recent Orders
- Sales Chart
- Quick Actions

## 🔒 Security

The application uses:

- JWT Authentication
- Password Hashing with bcrypt
- Protected Frontend Routes
- Role-Based Authorization
- Backend Admin Authorization
- Environment Variables for Sensitive Data

## 🚧 Future Improvements

- Razorpay / Stripe payment integration
- Food image upload
- Customer reviews and ratings
- Coupons and discount system
- Order cancellation
- Email notifications
- Delivery partner management
- Real-time order tracking
- Restaurant management
- Responsive mobile navigation


## 🎯 Project Objective

The main objective of this project is to build a complete full-stack food delivery platform and demonstrate practical knowledge of:

- React development
- REST API development
- MongoDB database management
- Authentication
- Authorization
- CRUD operations
- Cart management
- Checkout and order placement
- Order management
- Admin dashboard developmentd



## 👨‍💻 Developer

**Saksham Kashyap**

BCA Student

---

## 📌 Project Status

**Completed ✅**

This project was developed for educational, academic, and portfolio purposes.

---

## 📄 License

This project is created for educational and portfolio purposes.