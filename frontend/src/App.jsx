import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import ViewRecipe from './pages/ViewRecipe';
import Home from './pages/Home';
import Layout from "./components/Layout";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-recipe" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        <Route path="/view-recipe/:id" element={<ViewRecipe />} />
        <Route path="/layout" element={<Layout />} />
      </Routes>
      </>
  );
}

export default App;

