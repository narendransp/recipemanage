const Recipe = require("../models/Recipe");


const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const addRecipe = async (req, res) => {
  try {
    const recipe = new Recipe({
      title: req.body.title,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients ? JSON.parse(req.body.ingredients) : [],
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
      image: req.file ? req.file.filename : null,
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message });
  }
};


const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients ? JSON.parse(req.body.ingredients) : [],
        tags: req.body.tags ? JSON.parse(req.body.tags) : [],
        image: req.file ? req.file.filename : undefined,
      },
      { new: true }
    );
    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getRecipes,
  addRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};


