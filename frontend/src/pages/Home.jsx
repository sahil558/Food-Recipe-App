import React from "react";
import "./home.css"; // Ensure you have a CSS file for styling

const Home = () => {
  // ✅ Fix image paths
  const categoryImages = {
    "Quick and Easy": "/easy recipe.jpg",
    "Dinner": "/dinner recipe.jpg",
    "Vegetarian": "/veg recipe.jpg",
    "Healthy": "/healthy recipe.jpg",
    "Instant Pot": "/instant pot.jpg",
    "Vegan": "/vegan recipe.jpg",
    "Meal Prep": "/veg prep.jpg",
    "Soups": "/soup.jpg",
    "Salads": "/salad recipe.jpg",
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h2 className="hero-title">
          SIMPLE RECIPES MADE FOR{" "}
          <span className="italic">real, actual, everyday life.</span>
        </h2>
      </div>

      {/* Featured Recipe Categories */}
      <div className="featured-recipes">
        <div className="recipe-category">
          <img src="/healthy recipe.jpg" alt="Healthy" />
          <button className="category-label">HEALTHY</button>
        </div>
        <div className="recipe-category">
          <img src="/soup.jpg" alt="Soups" />
          <button className="category-label">SOUPS</button>
        </div>
        <div className="recipe-category">
          <img src="/winter recipe.jpg" alt="Winter" />
          <button className="category-label">WINTER</button>
        </div>
        <div className="recipe-category">
          <img src="/veg recipe.jpg" alt="Vegetarian" />
          <button className="category-label">VEGETARIAN</button>
        </div>
      </div>


      {/* Circular Recipe Categories - Responsive Grid */}
      <div className="recipe-thumbnails">
        {Object.keys(categoryImages).map((category, index) => (
          <div key={index} className="thumbnail-item">
            <img src={categoryImages[category]} alt={category} />
            <p>{category}</p>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Home;
