import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-row">
        {/* Left: Profile Image */}
        <div className="about-image">
          <img src="\food receipe.avif" alt="Lindsay" className="responsive-img" />
        </div>

        {/* Right: About Content */}
        <div className="about-content">
          <h6 className="section-title">NutriKitchen &gt; About Me</h6>
          <h1 className="main-title">About Me</h1>
          <h5 className="sub-title">
            HI, MY NAME IS <span className="name-highlight">Sachin</span>
          </h5>
          <p>
          At NutriKitchen, we bring you easy, nutritious, and flavorful recipes that fit into your busy lifestyle. Whether you're looking for quick meals, wholesome dinners, or indulgent treats with a healthy twist, we’ve got you covered!
          </p>
          <p>
          Why Choose Nutri Kitchen? <br />
          ✅ Easy & Quick Recipes – Perfect for busy schedules <br />
          ✅ Healthy Yet Flavorful – No compromise on taste <br />
          ✅ Fusion of Cuisines – A blend of global flavors with a nutritious twist <br />
          ✅ Step-by-Step Guidance – Making cooking fun and effortless <br />
          </p>
          <p>
          From wholesome meals to guilt-free indulgences, we’re here to inspire you to cook better and eat smarter. Let’s embark on a journey of flavorful nutrition together! <br />
          Happy Cooking! 🍽️💚
          </p>
        </div>
      </div>

      {/* Social Media & Email Signup */}
      <div className="social-section">
        <div className="social-links">
          <h5>FOLLOW US</h5>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="bi bi-pinterest"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="bi bi-twitter"></i>
          </a>
        </div>

        {/* Email Signup Form */}
        <div className="email-signup">
          <input type="text" className="input-field" placeholder="First Name" />
          <input type="email" className="input-field" placeholder="Email" />
          <button className="signup-button">GO</button>
        </div>
      </div>
    </div>
  );
};

export default About;
