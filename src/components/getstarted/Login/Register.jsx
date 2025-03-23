import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCheck } from "react-icons/fa";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("job-seeker"); // Default role
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    setSuccess("");

    if (!firstName || !lastName || !password || !email || !number || !confirmPassword) {
      setErr("All fields are required");
      setLoading(false);
      return;
    }
    if (password.length < 4) {
      setErr("Password must be at least 4 characters");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setErr("Passwords do not match");
      setLoading(false);
      return;
    }

    const userdata = { firstName, lastName, email, password, number, role };

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", userdata, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        setSuccess("Signup Successful!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setNumber("");
        setRole("job-seeker");
      } else {
        setErr(response.data.message || "Signup Failed");
      }
    } catch (error) {
      setErr(`Error: ${error.response?.data?.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleForm} className="glass-form">
        <h2>🚀 Create Your Account</h2>

        <div className="input-group">
          <label><FaUser className="icon" /> First Name</label>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div className="input-group">
          <label><FaUser className="icon" /> Last Name</label>
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className="input-group">
          <label><FaPhone className="icon" /> Phone Number</label>
          <input type="number" placeholder="Phone Number" value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>

        <div className="input-group">
          <label><FaEnvelope className="icon"/> Email</label>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="input-group">
          <label><FaLock className="icon" /> Password</label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="input-group">
          <label><FaCheck className="icon" /> Confirm Password</label>
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        <div className="input-group">
          <label>🎯 Select Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="job-seeker">Job Seeker</option>
            <option value="job-poster">Job Poster</option>
          </select>
        </div>

        {err && <p className="error">{err}</p>}
        {success && <p className="success">{success}</p>}
        {loading && <p className="loading">Loading...</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up 🚀"}
        </button>
      </form>
    </div>
  );
}

export default Register;
