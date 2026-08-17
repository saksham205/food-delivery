import { useState } from "react";

function Hero({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    onSearch(search);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="small-title">
          FAST & FRESH DELIVERY
        </p>

        <h1>
          Delicious Food,
          <br />
          Delivered To You 🍕
        </h1>

        <p>
          Order your favourite meals from the best restaurants
          around you.
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="hero-image">
        🍔
      </div>
    </section>
  );
}

export default Hero;