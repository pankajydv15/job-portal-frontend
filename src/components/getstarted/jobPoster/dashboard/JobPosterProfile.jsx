import React, { useState } from "react";
import "./jobPosterProfile.css";

function JobPosterProfile() {
  const [formData, setFormData] = useState({
    CompanyName: "",
    Description: "",
    website: "",
    email: "",
    industry: "",
    location: "",
    socialMedia: "",
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

    try {
      // Simulate API call
      console.log("Form Data Submitted:", formData);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <h1 className="title">Job Poster Profile</h1>
      <form className="form-data" onSubmit={handleSubmit}>
        <label>Company Name</label>
        <input
          type="text"
          name="CompanyName"
          value={formData.CompanyName}
          placeholder="Enter your company name"
          onChange={handleChange}
          required
        />

        <label>Company Description</label>
        <textarea
          name="Description"
          value={formData.Description}
          placeholder="Enter a brief description of your company"
          onChange={handleChange}
          required
        ></textarea>

        <label>Website</label>
        <input
          type="url"
          name="website"
          value={formData.website}
          placeholder="Enter your company website"
          onChange={handleChange}
        />

        <label>Contact Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your contact email"
          onChange={handleChange}
          required
        />

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
        </select>

        <label>Company Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          placeholder="Enter your company location"
          onChange={handleChange}
        />

        <label>Social Media Links</label>
        <input
          type="text"
          name="socialMedia"
          value={formData.socialMedia}
          placeholder="Enter your social media links"
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default JobPosterProfile;
