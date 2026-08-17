import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      navigate("/cart");
      return;
    }

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        items: cart.map((item) => ({
          foodId: String(item.id),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),

        customer: {
          name: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          pincode: form.pincode,
        },

        subtotal,
        deliveryFee,
        total,
        paymentMethod,
      };

      const response = await axios.post(
        "http://localhost:5001/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        response.data.message ||
          "Order placed successfully! 🎉"
      );

      clearCart();
      navigate("/my-orders");
    } catch (error) {
      console.error("Order Error:", error);

      alert(
        error.response?.data?.message ||
          "Order placement failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div>
          <p>COMPLETE YOUR ORDER 🛍️</p>
          <h1>Checkout</h1>
        </div>

        <button
          type="button"
          className="checkout-back-btn"
          onClick={() => navigate("/cart")}
        >
          <ArrowLeft size={17} />
          Back to Cart
        </button>
      </div>

      <div className="checkout-container">
        {/* LEFT SIDE */}

        <form
          className="checkout-form"
          onSubmit={placeOrder}
        >
          {/* DELIVERY */}

          <div className="checkout-section">
            <div className="checkout-section-title">
              <div className="checkout-icon">
                <MapPin size={19} />
              </div>

              <div>
                <h2>Delivery Address</h2>
                <p>
                  Where should we deliver your order?
                </p>
              </div>
            </div>

            <div className="checkout-field-grid">
              <div className="checkout-field full">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="checkout-field">
                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                />
              </div>

              <div className="checkout-field">
                <label>City</label>

                <input
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="checkout-field full">
                <label>Full Address</label>

                <textarea
                  name="address"
                  placeholder="House no., street, area..."
                  value={form.address}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </div>

              <div className="checkout-field">
                <label>Pincode</label>

                <input
                  type="text"
                  name="pincode"
                  placeholder="6-digit pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  pattern="[0-9]{6}"
                  maxLength="6"
                  required
                />
              </div>
            </div>
          </div>

          {/* PAYMENT */}

          <div className="checkout-section">
            <div className="checkout-section-title">
              <div className="checkout-icon">
                <CreditCard size={19} />
              </div>

              <div>
                <h2>Payment Method</h2>
                <p>
                  Select how you want to pay
                </p>
              </div>
            </div>

            <label
              className={`payment-option ${
                paymentMethod === "COD"
                  ? "selected"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              <div>
                <strong>Cash on Delivery</strong>
                <span>
                  Pay when your order arrives
                </span>
              </div>
            </label>

            <label
              className={`payment-option ${
                paymentMethod === "UPI"
                  ? "selected"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              <div>
                <strong>
                  UPI / Online Payment
                </strong>
                <span>
                  Pay securely online
                </span>
              </div>
            </label>
          </div>

          {/* PLACE ORDER */}

          <button
            className="place-order-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Placing Order..."
              : `Place Order • ₹${total}`}
          </button>
        </form>

        {/* RIGHT SIDE */}

        <div className="checkout-summary">
          <div className="checkout-summary-header">
            <div>
              <p>YOUR ORDER</p>
              <h2>Order Summary</h2>
            </div>

            <ShoppingBag size={22} />
          </div>

          <div className="checkout-items">
            {cart.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >
                <div>
                  <strong>{item.name}</strong>

                  <span>
                    × {item.quantity}
                  </span>
                </div>

                <strong>
                  ₹
                  {item.price *
                    item.quantity}
                </strong>
              </div>
            ))}
          </div>

          <hr />

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>₹{subtotal}</strong>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <strong>₹{deliveryFee}</strong>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>

          <p className="checkout-secure">
            🔒 Secure checkout • Fast delivery
          </p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;