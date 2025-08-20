import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import food from '../assets/food.png';

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // state for dropdown

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={food} alt="View food" />
        <h1>RECIPE BOOK</h1>
      </div>

      {/* Hamburger icon */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Links */}
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
        <Link to="/home" onClick={() => setIsOpen(false)}>Home</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
