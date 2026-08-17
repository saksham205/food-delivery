import { ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function FoodCard({ food, addToCart }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (food?.id) {
      navigate(`/food/${food.id}`);
    }
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(food);
  };

  return (
    <div className="food-card" onClick={handleCardClick}>
      <div className="food-image">
        <img src={food.image} alt={food.name} />
      </div>

      <div className="food-info">
        <div className="food-title">
          <h3>{food.name}</h3>

          <span className="rating">
            <Star size={15} fill="currentColor" />
            {food.rating}
          </span>
        </div>

        <p>{food.description}</p>

        <div className="food-bottom">
          <strong>₹{food.price}</strong>

          <button onClick={handleAdd}>
            <ShoppingCart size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;