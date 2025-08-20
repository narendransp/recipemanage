import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useParams, Link } from "react-router-dom";
import "../index.css"; // keep global CSS

export default function ViewRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await API.get("/recipes");
        const r = data.find((r) => r._id === id);
        setRecipe(r);
      } catch (err) {
        alert("Error fetching recipe");
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="loading">Loading...</p>;

  return (
    <div className="view-recipe-container">
      <h2 className="recipe-title">{recipe.title}</h2>

      {recipe.image && (
        <div className="recipe-image-wrapper">
          <img
            src={`http://localhost:5000${recipe.image}`}
            alt={recipe.title}
            className="recipe-image"
          />
        </div>
      )}

      <div className="recipe-section">
        <h3>📝 Ingredients</h3>
        <p>{recipe.ingredients.join(", ")}</p>
      </div>

      <div className="recipe-section">
        <h3>👩‍🍳 Instructions</h3>
        <p>{recipe.instructions}</p>
      </div>

      <div className="back-btn-wrapper">
        <Link to="/dashboard" className="back-btn">
          ⬅ Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
