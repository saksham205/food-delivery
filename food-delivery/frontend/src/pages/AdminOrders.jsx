import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://food-delivery-cnsn.onrender.com/api/orders/admin/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data);
      } catch (error) {
        console.error("Fetch orders error:", error);

        alert(
          error.response?.data?.message ||
            "Unable to fetch orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Update order status
  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `https://food-delivery-cnsn.onrender.com/api/orders/${orderId}/status`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? response.data.order
            : order
        )
      );

      alert("Order status updated ✅");
    } catch (error) {
      console.error("Update status error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update order status"
      );
    }
  };

  // Search + Status Filter
  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      order._id.toLowerCase().includes(search) ||
      (order.customer?.name || "")
        .toLowerCase()
        .includes(search) ||
      (order.customer?.phone || "")
        .toLowerCase()
        .includes(search);

    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Loading
  if (loading) {
    return (
      <div className="admin-layout">
        <AdminSidebar />

        <main className="admin-main">
          <h2>Loading orders...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        {/* HEADER */}

        <div className="dashboard-header">
          <div>
            <p>Manage customer orders 📦</p>
            <h1>Admin Orders</h1>
          </div>

          <div className="admin-profile">
            👨‍💼 Admin
          </div>
        </div>

        {/* SEARCH + FILTER */}

        <div className="order-filters">
          <input
            type="text"
            placeholder="Search customer, phone or order ID..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">
              All Status
            </option>

            <option value="Placed">
              Placed
            </option>

            <option value="Preparing">
              Preparing
            </option>

            <option value="Out for Delivery">
              Out for Delivery
            </option>

            <option value="Delivered">
              Delivered
            </option>
          </select>
        </div>

        {/* ORDERS */}

        {filteredOrders.length === 0 ? (
          <div className="dashboard-section">
            <h2>No orders found</h2>

            <p className="empty-text">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => (
              <div
                className="order-card"
                key={order._id}
              >
                {/* ORDER HEADER */}

                <div className="order-header">
                  <div>
                    <h3>
                      Order #{order._id.slice(-6)}
                    </h3>

                    <p>
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <span className="order-status">
                    {order.status}
                  </span>
                </div>

                {/* ORDER ITEMS */}

                <div className="order-items">
                  {order.items?.map(
                    (item, index) => (
                      <div
                        className="order-item"
                        key={`${order._id}-${index}`}
                      >
                        <span>
                          {item.name} ×{" "}
                          {item.quantity}
                        </span>

                        <strong>
                          ₹
                          {item.price *
                            item.quantity}
                        </strong>
                      </div>
                    )
                  )}
                </div>

                {/* CUSTOMER DETAILS */}

                <div className="order-footer">
                  <div>
                    <span>Customer</span>

                    <strong>
                      {order.customer?.name ||
                        "Customer"}
                    </strong>
                  </div>

                  <div>
                    <span>Phone</span>

                    <strong>
                      {order.customer?.phone ||
                        "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>Address</span>

                    <strong>
                      {order.customer?.address ||
                        "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>City</span>

                    <strong>
                      {order.customer?.city ||
                        "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>Pincode</span>

                    <strong>
                      {order.customer?.pincode ||
                        "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>Payment</span>

                    <strong>
                      {order.paymentMethod || "COD"}
                    </strong>
                  </div>

                  <div>
                    <span>Total</span>

                    <strong>
                      ₹{order.total}
                    </strong>
                  </div>
                </div>

                {/* STATUS UPDATE */}

                <div className="admin-status">
                  <label
                    htmlFor={`status-${order._id}`}
                  >
                    Update Status:
                  </label>

                  <select
                    id={`status-${order._id}`}
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="Placed">
                      Placed
                    </option>

                    <option value="Preparing">
                      Preparing
                    </option>

                    <option value="Out for Delivery">
                      Out for Delivery
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminOrders;