import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Recipe from "./pages/Recipe";
import AddRecipe from "./pages/AddRecipe";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");  // ✅ Check for "token" instead of "username"
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <AppContent
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}  // ✅ Pass setIsLoggedIn to Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </Router>
  );
}

const AppContent = ({ isLoggedIn, setIsLoggedIn, searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const showSearchBar = location.pathname === "/recipes"; // ✅ Show search bar only on Recipes page

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}  // ✅ Pass setIsLoggedIn to Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSearchBar={showSearchBar}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipe searchQuery={searchQuery} />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
      </Routes>
    </>
  );
};

export default App;
