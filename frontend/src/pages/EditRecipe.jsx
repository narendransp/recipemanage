import React, { useState, useEffect } from "react";
import API from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import "../index.css";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch recipe by ID
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        console.log("Fetching recipe with ID:", id);
        const { data } = await API.get(`/recipes/${id}`);
        console.log("Fetched recipe:", data);

        setTitle(data.title || "");
        setIngredients(data.ingredients ? data.ingredients.join(", ") : "");
        setInstructions(data.instructions || "");
        if (data.image) {
          setPreview(`http://localhost:5000${data.image}`);
        }
      } catch (err) {
        console.error("❌ Error fetching recipe:", err.response || err.message);
        alert("Error fetching recipe. Check console for details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  // ✅ Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Submit updated recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append(
        "ingredients",
        JSON.stringify(ingredients.split(",").map((i) => i.trim()))
      );
      formData.append("instructions", instructions);
      if (image) formData.append("image", image);

      await API.put(`/recipes/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Recipe updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Error updating recipe:", err.response || err.message);
      alert("Error updating recipe. Check console for details.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading recipe...</p>;
  }

  return (
    <div className="add-recipe-container">
      <button 
          onClick={() => navigate('/dashboard')}
          className="back-btn"
        >
          <span>←</span>
          Back to Dashboard
        </button>
    <div className="edit-recipe-card">
      {/* Header Section */}
      <div className="add-recipe-header">
        <div className="add-recipe-icon">✏️</div>
        <h2 className="add-recipe-title">Edit Recipe</h2>
        <p className="add-recipe-subtitle">
          Update your delicious recipe and keep it fresh!
        </p>
      </div>

      {/* Recipe Form */}
      <form onSubmit={handleSubmit} className="add-recipe-form">
        <div className="input-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe Title"
            className="add-recipe-input"
            required
          />
          <span className="input-icon">📝</span>
        </div>

        <div className="input-group">
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Ingredients (comma separated)"
            className="add-recipe-input"
            required
          />
          <span className="input-icon">🥘</span>
        </div>

        <div className="input-group">
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Cooking Instructions"
            className="add-recipe-textarea"
            required
          />
          <span className="input-icon textarea-icon">📋</span>
        </div>

        {/* Custom File Upload */}
        <div className="input-group">
          <div className="file-input-container">
            <button
              type="button"
              className="file-input-btn"
              onClick={() => document.getElementById("file-input").click()}
            >
              <span>📷</span>
              {image ? "Change Recipe Image" : "Upload Recipe Image"}
            </button>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input-hidden"
            />
          </div>
        </div>

{/* Image Preview */}
        {preview && (
          <div className="image-preview-container">
            <span className="preview-label">Image Preview:</span>
            <img
              src={preview}
              alt="Recipe Preview"
              className="image-preview"
            />
          </div>
        )}

        <button type="submit" className="add-recipe-submit-btn">
          Update Recipe
        </button>
      </form>
    </div>
    </div>
  );
}
