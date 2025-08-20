import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import recipe from "../assets/recipe.jpg"; 
import "../index.css";


const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  return (
    <div className="home-container">
{/* Hero Section (75% screen height) */}
      <section
        className="welcome-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${recipe})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "75vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1 className="welcome-title">👋 Welcome, {username}!</h1>
        <p className="welcome-subtitle">
          Ready to cook something amazing today? Share your best recipes and inspire others 🍲
        </p>
      </section>

{/* Add Recipe Section */}
      <section className="add-recipe-section">
        <h2 className="section-heading">➕ Add Recipes</h2>
        <p className="section-subtext">
          Share your favorite dishes with the community and build your recipe book.
        </p>
        <Link to="/add-recipe">
          <button className="add-recipe-btn-home">Add Your Recipe</button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
