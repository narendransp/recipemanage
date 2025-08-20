import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';
import '../index.css';

export default function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [pinned, setPinned] = useState([]);

  const fetchRecipes = async () => {
    try {
      const { data } = await API.get('/recipes');
      setRecipes(data);
    } catch (err) {
      alert('Error fetching recipes');
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);



    /* Delete recipe*/
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    try {
      await API.delete(`/recipes/${id}`);
      setRecipes(recipes.filter((r) => r._id !== id)); // remove from state
      alert('Recipe deleted successfully!');
    } catch (err) {
      alert('Error deleting recipe');
      console.error(err);
    }
  };



  {/*Search & Filter*/}
  const filteredRecipes = recipes.filter(r => {
    const searchTerm = search.toLowerCase();
    return (
      r.title.toLowerCase().includes(searchTerm) ||
      r.ingredients.join(', ').toLowerCase().includes(searchTerm) ||
      r.instructions.toLowerCase().includes(searchTerm)
    );
  });

 {/*Toggle Pin*/}
  const togglePin = (id) => {
    setPinned(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <>
      <div className="dashboard-header">
        <Link to="/add-recipe" className="my-button-add">➕ Add Recipe</Link>

{/* Search bar */}
        <input
          type="text"
          placeholder="🔍 Search recipes..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
{/* Pinned Section */}
      {
       pinned.length > 0 && (
        <div className="pinned-container">
          <h2>📌 Pinned Recipes</h2>
          <div className="recipes-container">
            {recipes
              .filter(r => pinned.includes(r._id))
              .map(r => (
                <div key={r._id} className="recipe-card pinned">
                  <h3>{r.title} 😋</h3>
                  {r.image && (
                    <img
                      src={`http://localhost:5000${r.image}`}
                      alt={r.title}
                      className="recipe-image"
                    />
                  )}
                  <p className="ingredients-p"><strong>Tags:</strong> {r.ingredients.slice(0, 2).join(', ')}...</p>
                  <Link to={`/view-recipe/${r._id}`} className="submit-btnVR">VIEW</Link>
                </div>
              ))}
          </div>
        </div>
      )}

{/* All Recipes */}
      <div className="recipes-container">
        {filteredRecipes.map(r => (
          <div key={r._id} className="recipe-card">
            <div className="card-header">
              <h3>{r.title} 🍽️</h3>
              <button className="pin-btn" onClick={() => togglePin(r._id)}>
                {pinned.includes(r._id) ? "📌 Unpin" : "📍 Pin"}
              </button>
            </div>

{/* Display image */}
            {r.image && (
              <img
                src={`http://localhost:5000${r.image}`}
                alt={r.title}
                className="recipe-image"
              />
            )}

            <p className="ingredients-p"><strong>🥕 Ingredients:</strong> {r.ingredients.join(', ')}</p>
            <p className="ingredients-p"><strong>📖 Instructions:</strong> {r.instructions}</p>

{/* Tags Section (splitting ingredients as tags) */}
            <div className="tags">
              {r.tags?.map((tag, i) => (
                <span key={i} className="tag">#{tag.trim()}</span>
                ))}</div>

            <div className="actions">
              <Link to={`/view-recipe/${r._id}`} className="submit-btnVR">👀 View</Link>
              <Link to={`/edit-recipe/${r._id}`} className="submit-btnVR">✏️ Edit</Link>
              <button onClick={() => handleDelete(r._id)} className="submit-btnVR" style={{ background: 'black' }}>
                🗑 DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
