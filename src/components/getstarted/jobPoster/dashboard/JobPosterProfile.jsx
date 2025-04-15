import React, { useState } from "react";
import "./jobPosterProfile.css";
import axios from "axios";

function JobPosterProfile() {
  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    website: "",
    email: "",
    industry: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/job/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Form Data Submitted:", formData);

      if (response.status === 201) {
        setSuccess("Job posted successfully!");
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (err) {
      console.error("Error posting job:", err);
      setError("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <h1 className="title">Job Poster Profile</h1>
      <form className="form-data" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            placeholder="Enter your company name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Company Description</label>
          <textarea
            name="description"
            value={formData.description}
            placeholder="Enter a brief description of your company"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            placeholder="Enter your company website"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Contact Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your contact email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Industry Type</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
          >
            <option value="">Select Industry</option>
            <option value="IT">IT</option>
            <option value="HealthCare">HealthCare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Company Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            placeholder="Enter your company location"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default JobPosterProfile;
