import { useEffect, useState } from "react";
import axios from "axios";
import {
  Package,
  MapPin,
  Phone,
  CreditCard,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusOrder = [
    "Placed",
    "Preparing",
    "Out for Delivery",
    "Delivered",
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please login first.");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:5001/api/orders/my-orders",
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
  }, [navigate]);

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-header">
          <div>
            <p>YOUR ORDERS 📦</p>
            <h1>My Orders</h1>
          </div>
        </div>

        <div className="orders-loading">
          <h2>Loading your orders...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      {/* HEADER */}

      <div className="orders-header">
        <div>
          <p>YOUR ORDERS 📦</p>
          <h1>My Orders</h1>
        </div>

        <button
          type="button"
          className="orders-menu-btn"
          onClick={() => navigate("/all-foods")}
        >
          <ArrowLeft size={17} />
          Order More Food
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <div className="no-orders-icon">
            <ShoppingBag size={42} />
          </div>

          <h2>No orders yet</h2>

          <p>
            Order your favourite food and it
            will appear here.
          </p>

          <button
            type="button"
            className="browse-food-btn"
            onClick={() => navigate("/all-foods")}
          >
            Browse Food →
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const currentIndex =
              statusOrder.indexOf(order.status);

            return (
              <div
                className="order-card"
                key={order._id}
              >
                {/* ORDER HEADER */}

                <div className="order-header">
                  <div>
                    <div className="order-title-row">
                      <Package size={19} />

                      <h3>
                        Order #
                        {order._id.slice(-6)}
                      </h3>
                    </div>

                    <p className="order-date">
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={`order-status customer-status ${
                      order.status
                        .toLowerCase()
                        .replaceAll(" ", "-")
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* PROGRESS */}

                <div className="order-progress">
                  {statusOrder.map(
                    (status, index) => {
                      const isActive =
                        index <= currentIndex;

                      return (
                        <div
                          className={`progress-step ${
                            isActive
                              ? "active"
                              : ""
                          }`}
                          key={status}
                        >
                          <div className="progress-circle">
                            {index + 1}
                          </div>

                          <span>{status}</span>
                        </div>
                      );
                    }
                  )}
                </div>

                {/* ITEMS */}

                <div className="order-items">
                  <div className="order-items-title">
                    <h4>Order Items</h4>
                    <span>
                      {order.items?.length || 0} item(s)
                    </span>
                  </div>

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

                {/* DELIVERY DETAILS */}

                <div className="customer-order-details">
                  <div className="detail-box">
                    <div className="detail-icon">
                      <MapPin size={17} />
                    </div>

                    <div>
                      <span>Delivery Address</span>

                      <strong>
                        {order.customer?.address ||
                          "Not provided"}
                      </strong>

                      <small>
                        {order.customer?.city ||
                          ""}
                        {order.customer?.pincode
                          ? ` - ${order.customer.pincode}`
                          : ""}
                      </small>
                    </div>
                  </div>

                  <div className="detail-box">
                    <div className="detail-icon">
                      <Phone size={17} />
                    </div>

                    <div>
                      <span>Phone</span>

                      <strong>
                        {order.customer?.phone ||
                          "Not provided"}
                      </strong>
                    </div>
                  </div>

                  <div className="detail-box">
                    <div className="detail-icon">
                      <CreditCard size={17} />
                    </div>

                    <div>
                      <span>Payment</span>

                      <strong>
                        {order.paymentMethod ||
                          "COD"}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* TOTAL */}

                <div className="order-total-section">
                  <div>
                    <span>Subtotal</span>
                    <strong>
                      ₹{order.subtotal}
                    </strong>
                  </div>

                  <div>
                    <span>Delivery Fee</span>
                    <strong>
                      ₹{order.deliveryFee}
                    </strong>
                  </div>

                  <div className="grand-total">
                    <span>Total</span>
                    <strong>
                      ₹{order.total}
                    </strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyOrders;