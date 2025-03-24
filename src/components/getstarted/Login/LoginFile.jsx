import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("rahul@gmail.com");
  const [password, setPassword] = useState("12345");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: email.trim(),
        password,
      });

      const { message, token, role } = res.data; // assuming backend sends role

      if (token) {
        localStorage.setItem("token", token);
        alert(message);
        
        // Redirect based on role
        if (role === "job-seeker") {
          navigate("/jobSeeker");
        } else if (role === "job-poster") {
          navigate("/jobPoster");
        } else {
          navigate("/"); // Fallback route
        }
      } else {
        alert("Login successful, but no token received");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1 className="login-title">Welcome</h1>
        <p className="login-subtitle">Login to continue your journey</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="login-footer-text">Don’t have an account?</p>
        <Link to="/register" className="signup-btn">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
