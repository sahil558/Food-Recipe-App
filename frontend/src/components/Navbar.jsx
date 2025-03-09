import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./Navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn, searchQuery, setSearchQuery, showSearchBar }) => {
  const navigate = useNavigate();  // ✅ Hook for navigation

  const handleLogout = () => {
    localStorage.removeItem("token");  // ✅ Remove authentication token
    setIsLoggedIn(false);  // ✅ Update login state
    navigate("/login");  // ✅ Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white">
      <div className="container-fluid">
        <a className="navbar-brand fs-3 fw-light" href="/">
          <span style={{ color: "orange" }}>Nutri</span>
          <span className="fst-italic">Kitchen</span>
        </a>

        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item"><a className="nav-link fw-bold text-dark" href="/">HOME</a></li>
            <li className="nav-item"><a className="nav-link fw-bold text-dark" href="/about">ABOUT</a></li>
            <li className="nav-item"><a className="nav-link fw-bold text-dark" href="/recipes">RECIPES</a></li>
          </ul>
        </div>

        {/* ✅ Show search bar only if `showSearchBar` is true */}
        
        {/* Login/Register or Logout Button */}
        {!isLoggedIn ? (
          <>
            <a className="" href="/login">LOGIN</a>
            <span className="fw-bold">/</span>
            <a className="text-dark ms-2 fw-bold" href="/register">REGISTER</a>
          </>
        ) : (
          <button className="logout" onClick={handleLogout}>
            LOGOUT 
          </button>
        )}


{showSearchBar && (
          <div className="d-flex align-items-center">
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Recipes..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
