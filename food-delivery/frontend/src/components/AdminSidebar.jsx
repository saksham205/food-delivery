import {
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  UtensilsCrossed,
  Home,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <div>🍔 Foodie</div>
        <span>Admin Panel</span>
      </div>

      <nav className="admin-nav">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            isActive
              ? "admin-nav-link active"
              : "admin-nav-link"
          }
        >
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin-orders"
          className={({ isActive }) =>
            isActive
              ? "admin-nav-link active"
              : "admin-nav-link"
          }
        >
          <ShoppingBag size={19} />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/admin-add-food"
          className={({ isActive }) =>
            isActive
              ? "admin-nav-link active"
              : "admin-nav-link"
          }
        >
          <PlusCircle size={19} />
          <span>Add Food</span>
        </NavLink>

        <NavLink
          to="/manage-food"
          className={({ isActive }) =>
            isActive
              ? "admin-nav-link active"
              : "admin-nav-link"
          }
        >
          <UtensilsCrossed size={19} />
          <span>Manage Food</span>
        </NavLink>
      </nav>

      <div className="admin-sidebar-bottom">
        <button
          type="button"
          className="admin-nav-link"
          onClick={() => navigate("/")}
        >
          <Home size={19} />
          <span>Back to Website</span>
        </button>

        <button
          type="button"
          className="admin-logout"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;