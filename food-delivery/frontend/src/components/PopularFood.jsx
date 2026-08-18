import { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "./FoodCard";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5001";

function PopularFood({
  addToCart,
  searchTerm,
  category,
}) {
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/food`
        );

        setFoods(response.data);
      } catch (error) {
        console.error(
          "Food fetch error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(
        (searchTerm || "").toLowerCase()
      );

    const matchesCategory =
      !category ||
      food.category
        ?.toLowerCase()
        .includes(
          category.toLowerCase()
        );

    return (
      matchesSearch &&
      matchesCategory
    );
  });

  return (
    <section className="popular-food">
      <div className="section-heading">
        <div>
          <p>OUR MENU</p>
          <h2>Popular Food</h2>
        </div>

        <button
          className="view-all"
          onClick={() =>
            navigate("/all-foods")
          }
        >
          View All →
        </button>
      </div>

      {loading ? (
        <p>Loading food...</p>
      ) : filteredFoods.length === 0 ? (
        <div className="empty-food-message">
          <p>
            No food found
            {searchTerm
              ? ` for "${searchTerm}"`
              : ""}.
          </p>
        </div>
      ) : (
        <div className="food-grid">
          {filteredFoods.map((food) => (
            <FoodCard
              key={food._id}
              food={{
                id: food._id,
                name: food.name,
                description:
                  food.description,
                price: food.price,
                rating: food.rating,
                image: food.image,
                category: food.category,
              }}
              addToCart={addToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default PopularFood;