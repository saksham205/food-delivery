import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function FoodDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/food/${id}`
        );

        setFood(response.data);
      } catch (error) {
        console.error("Food API error:", error);
        setFood(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    if (!food) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: food._id,
        name: food.name,
        description: food.description,
        price: food.price,
        rating: food.rating,
        image: food.image,
      });
    }

    alert(`${food.name} × ${quantity} added to cart 🛒`);
  };

  if (loading) {
    return (
      <div className="food-details-page">
        <h2>Loading food...</h2>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="food-details-page">
        <div className="food-details-error">
          <h2>Food not found</h2>

          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="food-details-page">
      <div className="food-details-card">
        <div className="food-details-image">
          <img
            src={food.image}
            alt={food.name}
          />
        </div>

        <div className="food-details-content">
          <button
            className="details-back-top"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>

          <span className="food-category-badge">
            {food.category}
          </span>

          <h1>{food.name}</h1>

          <div className="food-details-rating">
            <Star
              size={18}
              fill="currentColor"
            />
            <span>{food.rating}</span>
          </div>

          <p className="food-details-description">
            {food.description}
          </p>

          <div className="details-price">
            ₹{food.price}
          </div>

          <div className="quantity-section">
            <span>Quantity</span>

            <div className="quantity-control">
              <button onClick={decreaseQty}>
                <Minus size={18} />
              </button>

              <span>{quantity}</span>

              <button onClick={increaseQty}>
                <Plus size={18} />
              </button>
            </div>
          </div>

          <div className="details-total">
            <span>Total</span>

            <strong>
              ₹{food.price * quantity}
            </strong>
          </div>

          <button
            className="details-cart-btn"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>

          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodDetails;