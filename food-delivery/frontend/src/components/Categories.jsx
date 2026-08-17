const categories = [
  { name: "Pizza", icon: "🍕" },
  { name: "Burger", icon: "🍔" },
  { name: "Noodles", icon: "🍜" },
  { name: "Chicken", icon: "🍗" },
  { name: "Salad", icon: "🥗" },
  { name: "Desserts", icon: "🍰" },
];

function Categories({ onCategory }) {
  return (
    <section className="categories">
      <h2>Explore Categories</h2>

      <div className="category-list">
        {categories.map((category) => (
          <div
            className="category-card"
            key={category.name}
            onClick={() => onCategory(category.name)}
          >
            <span>
              {category.icon} {category.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;