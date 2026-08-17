import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import { useNavigate } from "react-router-dom";

function ManageFood() {
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/food"
      );

      setFoods(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load food items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const deleteFood = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:5001/api/food/${id}`
      );

      alert(response.data.message);

      setFoods((prevFoods) =>
        prevFoods.filter((food) => food._id !== id)
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete food."
      );
    }
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <AdminSidebar />

        <main className="admin-main">
          <h2>Loading food...</h2>
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
            <p>Manage your menu 🍔</p>
            <h1>Manage Food</h1>
          </div>

          <div className="admin-profile">
            👨‍💼 Admin
          </div>
        </div>

        {foods.length === 0 ? (
          <div className="no-food">
            <h2>No food items found</h2>

            <p>
              Add your first food item from Add Food.
            </p>
          </div>
        ) : (
          <div className="food-admin-grid">
            {foods.map((food) => (
              <div
                className="food-admin-card"
                key={food._id}
              >
                <img
                  src={food.image}
                  alt={food.name}
                />

                <div className="food-admin-info">
                  <h3>{food.name}</h3>

                  <p>{food.description}</p>

                  <div className="food-admin-meta">
                    <strong>
                      ₹{food.price}
                    </strong>

                    <span>
                      ⭐ {food.rating}
                    </span>
                  </div>

                  <span className="food-category">
                    {food.category}
                  </span>

                  <div className="food-admin-actions">
                    <button
                      className="edit-food-btn"
                      onClick={() =>
                        navigate(
                          `/edit-food/${food._id}`
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-food-btn"
                      onClick={() =>
                        deleteFood(food._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ManageFood;