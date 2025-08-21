import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../index.css';
import food from '../assets/food.png';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token); // true if token exists
  }, [location]); // update on route change

  const logout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={food} alt="Food logo" />
        <h1>RECIPE BOOK</h1>
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link to="/home" onClick={() => setIsOpen(false)}>Home</Link>

        {loggedIn ? (
          <>
            <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
        )}
      </div>
    </nav>
  );
}

