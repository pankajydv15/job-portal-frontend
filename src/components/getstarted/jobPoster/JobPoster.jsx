import React from "react";
import "./jobPoster.css";
import pic from "./pic.jpg";
import { useNavigate } from "react-router-dom";

function JobPoster() {
  const navigate = useNavigate();

  return (
    <div className="job-poster-container">
      <div className="job-poster-card">
        {/* Left Side Content */}
        <div className="textContent">
          <h2>
            🚀 <span className="spark">Hire Smarter</span>, Hire Faster!
          </h2>
          <p>
            Find top talent effortlessly. Post your job and connect with the
            best candidates — faster than ever before!
          </p>

          <ul className="job-poster-info">
            <li>✅ Instant job posting</li>
            <li>✅ Verified, skilled candidates</li>
            <li>✅ Easy applicant tracking</li>
          </ul>

          <button onClick={() => navigate("/jobPosterprofile")} className="btn">
            Post a Job Now
          </button>
          <button onClick={() => navigate("/posterDashboard")} className="btn">
            Profile
          </button>
        </div>

        {/* Right Side Image */}
        <div className="imageContainer">
          <img src={pic} alt="Hiring Team" />
        </div>
      </div>

      <div className="steps-container">
        <div className="step">
          <h3>1️⃣ Create your free account</h3>
          <p>
            All you need is your email address to create an account and start
            building your job post.
          </p>
        </div>

        <div className="step">
          <h3>2️⃣ Build your job post</h3>
          <p>
            Then just add a title, description, and location to your job post,
            and you're ready to go.
          </p>
        </div>

        <div className="step">
          <h3>3️⃣ Post your job</h3>
          <p>
            After you post your job, use our state-of-the-art tools to help you
            find dream talent.
          </p>
        </div>
      </div>

      <div className="cards-section">
        <div className="card-top">
          <div className="card">
            <h3>📢 Get more visibility</h3>
            <p>Sponsor your job to ensure it gets seen by the right people.</p>
          </div>
          <div className="card">
            <h3>🎯 Quality applicants</h3>
            <p>
              List your required skills for the job so relevant candidates
              apply.
            </p>
          </div>
        </div>

        <div className="card-bottom">
          <div className="card">
            <h3>🛠 Assess candidates</h3>
            <p>Add screener questions to test applicants’ skills.</p>
          </div>
          <div className="card">
            <h3>📂 Organize candidates</h3>
            <p>Keep track of all your candidates in one place.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobPoster;
