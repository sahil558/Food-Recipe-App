import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./recipe.css";

const Recipe = ({ searchQuery }) => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/recipes");
        setRecipes(res.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper function to truncate the description and add "..." if too long
  const truncateDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  return (
    <div className="recipe-grid">
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe, index) => (
          <div key={index}>
            <div className="card" style={{ width: "18rem" }}>
              <img
                src={recipe.imageUrl || "recipe.jpg"}
                className="card-img-top"
                alt={recipe.title}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">
                  {truncateDescription(recipe.description, 100)}
                </p>
                <a href="/" className="btn btn-primary">
                  Add to list
                </a>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt-3 text-muted">No recipes found</p>
      )}
      <div className="card1">
        <div className="card-body text-center">
          <button className="plus" onClick={() => navigate("/add-recipe")}>
            +
          </button>
          <p className="mt-2">Add Recipe</p>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
