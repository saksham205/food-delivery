import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

function EditFood() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/food/${id}`
        );

        const food = response.data;

        setForm({
          name: food.name || "",
          description: food.description || "",
          price: food.price || "",
          rating: food.rating || "",
          category: food.category || "",
          image: food.image || "",
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load food.");
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await axios.put(
        `http://localhost:5001/api/food/${id}`,
        {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          rating: Number(form.rating),
          category: form.category,
          image: form.image,
        }
      );

      alert("Food updated successfully ✅");

      navigate("/manage-food");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update food."
      );
    } finally {
      setSaving(false);
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
            <p>Update your menu item ✏️</p>
            <h1>Edit Food</h1>
          </div>

          <div className="admin-profile">
            👨‍💼 Admin
          </div>
        </div>

        <div className="add-food-page">
          <div className="add-food-card">
            <h2>Edit Food ✏️</h2>

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
                min="1"
                required
              />

              <label>Rating</label>

              <input
                type="number"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                min="1"
                max="5"
                step="0.1"
                required
              />

              <label>Category</label>

              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              />

              <label>Image URL</label>

              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                required
              />

              <button type="submit" disabled={saving}>
                {saving ? "Updating..." : "Update Food"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EditFood;