import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import PopularFood from "../components/PopularFood";

function Home({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  return (
    <>
      <Navbar />

      <Hero onSearch={setSearchTerm} />

      <Categories onCategory={setCategory} />

      <PopularFood
        addToCart={addToCart}
        searchTerm={searchTerm}
        category={category}
      />
    </>
  );
}

export default Home;