import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function PosterDasboard() {
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
      <div className="glass-card">
        <div className="user-card">

        <div className="profile-section">
          <img src={""} alt="Profile" className="profile-pic" />
          <h1 className="user-name">
            {user ? `${user.firstName} ${user.lastName}` : "Welcome!"}
          </h1>
        </div>

        <div className="user-bio">
          <p className="user-bioo">
            <span>Bio: </span>
            {user ? `${user.bio} ` : "Welcome!"}
          </p>
        </div>
        </div>

        {/* <div className="user-details-grid">
          {[
            {
              label: "Gender",
              value: user?.gender || "Your details will appear here",
            },
            {
              label: "Bio",
              value: user?.portfolio || "Your details will appear here",
            },
            {
              label: "Location",
              value: user?.location || "Your details will appear here",
            },
            {
              label: "Email",
              value: user?.email || "Your details will appear here",
            },
            {
              label: "Experience",
              value: user?.experience || "Your details will appear here",
            },
            {
              label: "Skills",
              value: user?.skills || "Your details will appear here",
            },
          ].map((detail, index) => (
            <div key={index} className="detail-card">
              <p className="label">{detail.label}</p>
              <p>{detail.value}</p>
            </div>
          ))}
        </div> */}

        {loading && <p className="loading-text">Loading...</p>}
        {error && <p className="error-text">{error}</p>}

        <div className="button-container">
          <button
            className="neon-btn"
            onClick={() => navigate("/profileManagement")}
          >
            Post a Job
          </button>
          <button className="neon-btn logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default PosterDasboard
