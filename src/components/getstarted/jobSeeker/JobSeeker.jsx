import React, { useState, useEffect } from "react";
import "./jobSeeker.css";
import profile from "./profilePic.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function JobSeeker() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found, please log in");

        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data);

        const { data, success } = response.data;

        if (success && data) {
          setUser(data);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (error) {
        console.error("API Error:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchLoggedInUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="main-container">
      <div className="dashboard-container">
        <div className="profile-section">
          {/* Profile Image */}
          <div className="profile-pic">
            <img src={profile} alt="Profile" />
          </div>

          {/* User Info */}
          <div className="user-info">
            <h1 className="user-name">
              {user ? `${user.firstName} ${user.lastName}` : "Welcome!"}
            </h1>

            <div className="user-details-container">
              {/* Left Side - Bio, Gender, Location */}
              <div className="user-left">
                <p className="user-details">
                  {user ? `Bio: ${user.bio}` : "Your details will appear here"}
                </p>
                <p className="user-details">
                  {user ? `Gender: ${user.gender}` : "Your details will appear here"}
                </p>
                <p className="user-details">
                  {user ? `Location: ${user.location}` : "Your details will appear here"}
                </p>
              </div>

              {/* Right Side - Email, Experience, Skills */}
              <div className="user-right">
                <p className="user-details">
                  {user ? `Email: ${user.email}` : "Your details will appear here"}
                </p>
                <p className="user-details">
                  {user ? `Experience: ${user.experience}` : "Your details will appear here"}
                </p>
                <p className="user-details">
                  {user ? `Skills: ${user.skills}` : "Your details will appear here"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading & Error Messages */}
        <div className="status-container">
          {loading && <p className="loading-text">Loading...</p>}
          {error && <p className="error-text">{error}</p>}
        </div>

        {/* Buttons */}
        <button className="edit-profile-btn" onClick={() => navigate("/profileManagement")}>
          Edit Profile
        </button>
        <button className="edit-profile-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default JobSeeker;
