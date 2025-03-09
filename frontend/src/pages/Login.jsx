import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", { email, password });
      console.log("Response Data:", res.data); // Check what is returned
      const token = res.data.token;
      if (!token) {
        alert("Login failed. No token received.");
        return;
      }
      localStorage.setItem("token", token);
      console.log("✅ Stored Token:", localStorage.getItem("token"));
      setIsLoggedIn(true);
      navigate("/recipes");
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data?.error || error.message);
      alert("Invalid Credentials: " + (error.response?.data?.error || "Something went wrong."));
    }
  };
  

  return (
    <div className="container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
