import { useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5001";

function AddFood() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    rating: "4.5",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/food`,
        {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          rating: Number(form.rating),
          category: form.category,
          image: form.image,
        }
      );

      alert(response.data.message);

      setForm({
        name: "",
        description: "",
        price: "",
        rating: "4.5",
        category: "",
        image: "",
      });
    } catch (error) {
      console.error("Add food error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to add food"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <div className="dashboard-header">
          <div>
            <p>Add a new item to your menu 🍽️</p>
            <h1>Add New Food</h1>
          </div>

          <div className="admin-profile">
            👨‍💼 Admin
          </div>
        </div>

        <div className="add-food-page">
          <div className="add-food-card">
            <h2>Add New Food 🍔</h2>

            <form onSubmit={handleSubmit}>
              <label>Food Name</label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label>Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />

              <label>Price</label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
              />

              <label>Rating</label>

              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={handleChange}
              />

              <label>Category</label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Category
                </option>
                <option value="Pizza">
                  Pizza 🍕
                </option>
                <option value="Burger">
                  Burger 🍔
                </option>
                <option value="Noodles">
                  Noodles 🍜
                </option>
                <option value="Chicken">
                  Chicken 🍗
                </option>
                <option value="Salad">
                  Salad 🥗
                </option>
                <option value="Desserts">
                  Desserts 🍰
                </option>
              </select>

              <label>Image URL</label>

              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Adding..."
                  : "Add Food"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddFood;