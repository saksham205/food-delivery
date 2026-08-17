import {
  ShoppingCart,
  User,
  LogOut,
  LayoutDashboard,
  UtensilsCrossed,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully 👋");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🍔 Foodie
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/all-foods">
          <UtensilsCrossed size={16} />
          Menu
        </Link>

        <Link to="/my-orders">
          My Orders
        </Link>

        <Link to="/">
          Restaurants
        </Link>

        <Link to="/">
          Offers
        </Link>

        <Link to="/">
          Contact
        </Link>

        {/* ADMIN LINK - ONLY FOR ADMIN */}
        {user?.role === "admin" && (
          <Link
            to="/admin-dashboard"
            className="admin-link"
          >
            <LayoutDashboard size={17} />
            Admin
          </Link>
        )}
      </div>

      <div className="nav-actions">
        <Link to="/cart" className="cart-link">
          <ShoppingCart size={21} />
        </Link>

        {user ? (
          <>
            <div className="user-info">
              <User size={20} />
              <span>{user.name}</span>
            </div>

            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
            >
              <LogOut size={17} />
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button
              type="button"
              className="login-btn"
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;