
// routes/recipes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const recipeController = require("../controllers/recipeController");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/", upload.single("image"), recipeController.addRecipe);
// Routes
router.get("/", recipeController.getRecipes);
router.get("/:id", recipeController.getRecipeById);
router.put("/:id", upload.single("image"), recipeController.updateRecipe);
router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;
