import React, { useState, useEffect } from "react";
import axios from "axios";
import profile from "../pic.jpg";
import { useNavigate } from "react-router-dom";
import "./posterDashboard.css"

function PosterDashboard() {
  const [user, setUser] = useState(null);
  const [userJobs, setUserJobs] = useState([]); // ✅ rename
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found, please log in");

        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { data, success } = response.data;

        if (success && data) {
          setUser(data);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (error) {
        setError("Failed to fetch data",error);
      } finally {
        setLoading(false);
      }
    };
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    const fetchJobsByUser = async () => {
      if (!user || !(user._id || user.id)) return;


      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/job/user/${user._id || user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const { data, success } = response.data;

        if (success && data) {
          setUserJobs(data); // ✅ assuming it's an array
        } else {
          setError("No jobs found");
        }
      } catch (error) {
        console.error("API Error:", error);
        setError("Failed to fetch job data");
      } finally {
        setLoading(false);
      }
    };

    fetchJobsByUser();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="main-container">
      <div className="glass-card">
        <div className="user-card">
          <div className="profile-section">
            <img src={profile} alt="Profile" className="profile-pic" />
            <h1 className="user-name">
              {user ? `${user.firstName} ${user.lastName}` : "Welcome!"}
            </h1>
          </div>
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="button-container">
          <button
            className="neon-btn"
            onClick={() => navigate("/jobPosterProfile")}
          >
            Post a Job
          </button>
          <button className="neon-btn logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="jobs-section">
          <h2>Your Posted Jobs</h2>
          {loading && <p className="loading-text">Loading jobs...</p>}
          {!loading && userJobs.length === 0 && <p>No jobs found.</p>}
          <ul>
            {userJobs.map((job) => (
              <li key={job._id}>
                <strong>{job.companyName}</strong> - {job.location} (
                {job.industry})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PosterDashboard;
