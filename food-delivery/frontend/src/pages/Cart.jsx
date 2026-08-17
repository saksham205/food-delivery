import { useNavigate } from "react-router-dom";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

function Cart({
  cart,
  increaseQty,
  decreaseQty,
  removeFromCart,
}) {
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <div>
          <p>YOUR ORDER 🛒</p>
          <h1>Your Cart</h1>
        </div>

        <button
          className="continue-shopping-btn"
          onClick={() => navigate("/all-foods")}
        >
          ← Continue Shopping
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <ShoppingBag size={42} />
          </div>

          <h2>Your cart is empty</h2>

          <p>
            Add some delicious food to continue.
          </p>

          <button
            className="checkout-btn"
            onClick={() => navigate("/all-foods")}
          >
            Browse Food →
          </button>
        </div>
      ) : (
        <div className="cart-container">
          {/* CART ITEMS */}

          <div className="cart-items">
            {cart.map((item) => (
              <div
                className="cart-item"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-details">
                  <h3>{item.name}</h3>

                  <p className="cart-item-price">
                    ₹{item.price}
                  </p>

                  <div className="quantity">
                    <button
                      type="button"
                      onClick={() =>
                        decreaseQty(item.id)
                      }
                    >
                      <Minus size={16} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQty(item.id)
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="cart-right">
                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>₹{subtotal}</strong>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <strong>₹{deliveryFee}</strong>
            </div>

            <hr />

            <div className="summary-row total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>

            <button
              className="checkout-btn"
              onClick={() =>
                navigate("/checkout")
              }
            >
              Proceed to Checkout →
            </button>

            <p className="cart-note">
              🔒 Secure checkout • Fast delivery
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;