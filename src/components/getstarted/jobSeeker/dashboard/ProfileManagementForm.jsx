import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./profileManagement.css";

const ProfileManagementForm = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    skills: '',
    experience: '',
    socialLinks: '',
    portfolio: '',
    location: '',
    profilePic: null,
    resume: null,
    gender: '',
    currentJobTitle: ''
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const token = localStorage.getItem("token"); // Token uthao login ke baad
      // console.log("Token:", token);
      const updatedFields = Object.entries(formData).reduce((acc, [key, value]) => {
        if (value !== "" && value !== null) {
          acc[key] = value;
        }
        return acc;
      }, {});
      console.log("Updated Fields:", updatedFields);
      
      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        updatedFields, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,// Token bheja header me
          },
        }
      );
  
      if (response.status === 200) {
        setSuccess("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setError("Error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  

  return (
    <div className="profile-form-container">
      <h2>Profile Management</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} />
        <input type="text" name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange} />
        <input type="text" name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} />
        <input type="text" name="socialLinks" placeholder="Social Links" value={formData.socialLinks} onChange={handleChange} />
        <input type="text" name="portfolio" placeholder="Portfolio" value={formData.portfolio} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="text" name="currentJobTitle" placeholder="Current Job Title" value={formData.currentJobTitle} onChange={handleChange} />
        <label htmlFor="profilePic">Upload Profile Picture</label>
        <input type="file" name="profilePic" onChange={handleChange} />
        <label htmlFor="resume">Upload Resume</label>
        <input type="file" name="resume" onChange={handleChange} />

        <button type="submit" disabled={loading}>Save Profile</button>
      </form>
      {loading && <p>Loading...</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={() => navigate('/jobSeeker')}>Back to Profle</button>
    </div>
  );
};

export default ProfileManagementForm;
