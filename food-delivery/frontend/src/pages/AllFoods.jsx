import { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "../components/FoodCard";


function AllFoods({ addToCart }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(
          "https://food-delivery-cnsn.onrender.com/api/food"
        );

        setFoods(response.data);
      } catch (error) {
        console.error("Food fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const categories = [
    "Pizza",
    "Burger",
    "Noodles",
    "Chicken",
    "Salad",
    "Desserts",
  ];

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      !category ||
      food.category
        ?.toLowerCase()
        .includes(category.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="all-foods-page">
      <div className="all-foods-container">
        <div className="all-foods-header">
          <div>
            <p>OUR MENU 🍽️</p>
            <h1>All Foods</h1>
          </div>
        </div>

        <div className="food-filters">
          <input
            type="text"
            placeholder="Search food..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="">All Categories</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p>Loading food...</p>
        ) : filteredFoods.length === 0 ? (
          <div className="no-food">
            <h2>No food found</h2>
            <p>
              Try another search or category.
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
                  description: food.description,
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
      </div>
    </div>
  );
}

export default AllFoods;