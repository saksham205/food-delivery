import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import AdminOrders from "./pages/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AddFood from "./pages/AddFood";
import ManageFood from "./pages/ManageFood";
import EditFood from "./pages/EditFood";
import FoodDetails from "./pages/FoodDetails";
import AllFoods from "./pages/AllFoods";

import AdminRoute from "./components/AdminRoute";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (food) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === food.id
      );

      if (existing) {
        return prev.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...food,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* CUSTOMER */}

        <Route
          path="/"
          element={<Home addToCart={addToCart} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              clearCart={clearCart}
            />
          }
        />

        <Route
          path="/my-orders"
          element={<MyOrders />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/food/:id"
          element={
            <FoodDetails
              addToCart={addToCart}
            />
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />

<Route
  path="/admin-add-food"
  element={
    <AdminRoute>
      <AddFood />
    </AdminRoute>
  }
/>

        

        <Route
          path="/manage-food"
          element={
            <AdminRoute>
              <ManageFood />
            </AdminRoute>
          }
        />

        <Route
          path="/edit-food/:id"
          element={
            <AdminRoute>
              <EditFood />
            </AdminRoute>
          }
        />
        <Route
  path="/all-foods"
  element={
    <AllFoods addToCart={addToCart} />
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;