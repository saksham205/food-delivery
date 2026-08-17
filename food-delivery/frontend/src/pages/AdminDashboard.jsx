import { useEffect, useState } from "react";
import axios from "axios";
import {
  ShoppingBag,
  Users,
  IndianRupee,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalSales: 0,
    pendingOrders: 0,
    recentOrders: [],
    salesChart: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5001/api/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(response.data);
      } catch (error) {
        console.error("Dashboard error:", error);

        alert(
          error.response?.data?.message ||
            "Unable to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const maxSales =
    stats.salesChart.length > 0
      ? Math.max(
          ...stats.salesChart.map((item) => item.sales)
        )
      : 0;

  if (loading) {
    return (
      <div className="admin-layout">
        <AdminSidebar />

        <main className="admin-main">
          <h2>Loading Dashboard...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <div className="dashboard-header">
          <div>
            <p>Welcome back 👋</p>
            <h1>Admin Dashboard</h1>
          </div>

          <div className="admin-profile">
            👨‍💼 Admin
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>
              <ShoppingBag size={17} />
              Total Orders
            </span>

            <strong>{stats.totalOrders}</strong>

            <small>All orders</small>
          </div>

          <div className="stat-card">
            <span>
              <Users size={17} />
              Total Users
            </span>

            <strong>{stats.totalUsers}</strong>

            <small>Registered users</small>
          </div>

          <div className="stat-card">
            <span>
              <IndianRupee size={17} />
              Total Sales
            </span>

            <strong>₹{stats.totalSales}</strong>

            <small>Overall revenue</small>
          </div>

          <div className="stat-card">
            <span>
              <ShoppingBag size={17} />
              Pending Orders
            </span>

            <strong>{stats.pendingOrders}</strong>

            <small>Need attention</small>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-section">
            <div className="section-title">
              <h2>Recent Orders</h2>
              <span>Latest 5</span>
            </div>

            {stats.recentOrders.length === 0 ? (
              <p className="empty-text">
                No recent orders.
              </p>
            ) : (
              <div className="recent-orders">
                {stats.recentOrders.map((order) => (
                  <div
                    className="recent-order-row"
                    key={order._id}
                  >
                    <div>
                      <strong>
                        #{order._id.slice(-6)}
                      </strong>

                      <p>
                        {order.customer?.name ||
                          "Customer"}
                      </p>
                    </div>

                    <div className="order-items-count">
                      {order.items?.length || 0} item(s)
                    </div>

                    <div>
                      <strong>
                        ₹{order.total}
                      </strong>
                    </div>

                    <span
                      className={`dashboard-status ${order.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dashboard-section">
            <div className="section-title">
              <h2>Sales - Last 7 Days</h2>
              <span>Revenue</span>
            </div>

            {stats.salesChart.length === 0 ? (
              <p className="empty-text">
                No sales data available.
              </p>
            ) : (
              <div className="sales-chart">
                {stats.salesChart.map((item) => {
                  const height =
                    maxSales > 0
                      ? (item.sales / maxSales) * 100
                      : 0;

                  return (
                    <div
                      className="chart-column"
                      key={item._id}
                    >
                      <div className="chart-value">
                        ₹{item.sales}
                      </div>

                      <div className="chart-bar-wrapper">
                        <div
                          className="chart-bar"
                          style={{
                            height: `${Math.max(
                              height,
                              5
                            )}%`,
                          }}
                        />
                      </div>

                      <div className="chart-label">
                        {item._id.slice(5)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;