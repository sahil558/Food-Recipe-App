import express from "express";
import multer from "multer";
import Recipe from "../models/Recipe.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware for authentication
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(400).json({ error: "Invalid token payload" });
    }
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// Multer setup for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET all recipes (with an imageUrl if an image exists)
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user", "username");
    const formattedRecipes = recipes.map((recipe) => ({
      _id: recipe._id,
      title: recipe.title,
      description: recipe.description,
      user: recipe.user,
      imageUrl:
        recipe.image && recipe.image.data
          ? `http://localhost:5000/recipes/image/${recipe._id}`
          : null,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
    }));
    console.log("Formatted recipes:", formattedRecipes);
    res.json(formattedRecipes);
  } catch (err) {
    console.error("Error in GET /recipes:", err);
    res.status(500).json({ error: "Error fetching recipes" });
  }
});

// POST: Add a new recipe (with optional image)
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  console.log("POST /recipes - Received file:", req.file); // Debug log
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }
    if (req.file) {
      console.log("File details:", {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      });
    } else {
      console.warn("No file uploaded with the recipe.");
    }
    const newRecipe = new Recipe({
      title,
      description,
      image: req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : null,
      user: req.user,
    });
    await newRecipe.save();
    console.log("New recipe saved:", newRecipe);
    res.status(201).json(newRecipe);
  } catch (err) {
    console.error("Error in POST /recipes:", err);
    res.status(500).json({ error: "Error saving recipe" });
  }
});

// GET: Serve image by recipe id
router.get("/image/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe || !recipe.image || !recipe.image.data) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.set("Content-Type", recipe.image.contentType);
    res.send(recipe.image.data);
  } catch (err) {
    console.error("Error fetching image:", err);
    res.status(500).json({ error: "Error fetching image" });
  }
});

export default router;
