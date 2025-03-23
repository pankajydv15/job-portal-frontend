import React from "react";
import "./job.css";
import { Link } from "react-router-dom";
import { FaUserTie, FaBriefcase } from "react-icons/fa";

function Job() {
  return (
    <div className="job-main">
      {/* Particle Background */}
      <div className="floating-particles"></div>

      <div className="are-you">
        <h2>Are you a</h2>
      </div>

      {/* Job Seeker & Poster Cards */}
      <div className="job">
        <Link to="/login" className="card job-seeker">
          <FaUserTie className="card-icon" />
          <h2>Job Seeker 💼</h2>
          <p>Find your dream job and start your journey!</p>
        </Link>

        <Link to="/post-job" className="card job-poster">
          <FaBriefcase className="card-icon" />
          <h2>Job Poster 🚀</h2>
          <p>Hire top talents for your company!</p>
        </Link>
      </div>

      {/* Call To Action */}
      <div className="cta-section">
        <h3>Not sure where to start?</h3>
        <Link to="/explore">
          <button className="explore-btn">Explore More ➜</button>
        </Link>
      </div>
    </div>
  );
}

export default Job;
