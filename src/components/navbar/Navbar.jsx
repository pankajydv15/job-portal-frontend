import React, { useState, useEffect } from "react";
import "./navbar.css";
import boy from "../../assets/boy.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const firstName = user?.name?.split(" ")[0];

  return (
    <div className="navbar">
      <div className="logo">
        <img src={boy} alt="pic" />
      </div>

      <div className={`items ${isOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <h2>HOME</h2>
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <h2>ABOUT US</h2>
        </NavLink>

        <NavLink
          to="/job"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <h2>JOB</h2>
        </NavLink>

        {!user ? (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `nav-link login-link ${isActive ? "active-login" : ""}`
            }
          >
            <h2>LOGIN</h2>
          </NavLink>
        ) : (
          <div className="user-dropdown" onClick={() => setShowDropdown(!showDropdown)}>
            <div className="user-name">
              <h2>{firstName}</h2>
            </div>
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => navigate("/profile")}>Profile</button>
                <button onClick={handleLogout}>Sign Out</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="hamburger" onClick={toggle}>
        <div className={`bck ${isOpen ? "rotate-top" : ""}`}></div>
        <div className={`bck ${isOpen ? "fade-out" : ""}`}></div>
        <div className={`bck ${isOpen ? "rotate-bottom" : ""}`}></div>
      </div>
    </div>
  );
}

export default Navbar;
