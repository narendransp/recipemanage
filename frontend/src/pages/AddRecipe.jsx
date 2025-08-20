import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function AddRecipe() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState(null); 
  const [preview, setPreview] = useState(null); 
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', JSON.stringify(ingredients.split(',').map(i => i.trim())));
    formData.append('instructions', instructions);
    formData.append("tags",JSON.stringify(tags.split(",").map((t) => t.trim())));

    if (image) formData.append('image', image);

    await API.post('/recipes', formData); 

    navigate('/dashboard');
  } catch (err) {
    console.error(err);
    alert('Error adding recipe');
  }
};

  return (
    <>
      <div className="add-recipe-container">
/* Back Button */
        <button 
          onClick={() => navigate('/dashboard')}
          className="back-btn"
        >
          <span>←</span>
          Back to Dashboard
        </button>

        <div className="add-recipe-card">
/* Header Section */
          <div className="add-recipe-header">
            <div className="add-recipe-icon">🍳</div>
            <h2 className="add-recipe-title">Add New Recipe</h2>
            <p className="add-recipe-subtitle">
              Share your culinary masterpiece with the world
            </p>
          </div>

/* Recipe Form */
          <form onSubmit={handleSubmit} className="add-recipe-form">
            <div className="input-group">
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
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
                onChange={e => setIngredients(e.target.value)}
                placeholder="Ingredients (comma separated)"
                className="add-recipe-input"
                required
              />
              <span className="input-icon">🥘</span>
            </div>

            
            <div className="input-group">
              <textarea
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                placeholder="Cooking Instructions"
                className="add-recipe-textarea"
                required
              />
              <span className="input-icon textarea-icon">📋</span>
            </div>


            <div className="input-group">
              <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags (comma separated, e.g. Dinner, Quick, Healthy)"
              className="add-recipe-input"
              />
              <span className="input-icon">🏷️</span>
              </div>
            



/*  File Upload */
            <div className="input-group">
              <div className="file-input-container">
                <button 
                  type="button"
                  className="file-input-btn"
                  onClick={() => document.getElementById('file-input').click()}
                >
                  <span>📷</span>
                  {image ? 'Change Recipe Image' : 'Upload Recipe Image'}
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

/* Image Preview */
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
              <span>✨</span>
              Add Recipe
            </button>
          </form>
        </div>
      </div>
    </>
  );
}