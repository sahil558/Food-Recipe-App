import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddRecipe.css";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    if (!token) {
      alert("You must be logged in to add a recipe.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
      console.log("Appending image file:", image);
    } else {
      console.warn("No image file selected");
    }

    try {
      const res = await axios.post("http://localhost:5000/recipes", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          // Do not set "Content-Type" manually so that Axios adds the proper boundary automatically
        },
      });
      console.log("Response:", res.data);
      navigate("/recipes");
    } catch (error) {
      console.error("Error adding recipe:", error.response?.data?.error || error.message);
      alert("Error: " + (error.response?.data?.error || "Failed to add recipe"));
    }
  };

  return (
    <div className="add-recipe-container">
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            console.log("Selected file:", file);
            setImage(file);
          }}
          required
        />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
