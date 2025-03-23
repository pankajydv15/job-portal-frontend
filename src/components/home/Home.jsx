// Home.jsx
import React from "react";
import "./home.css";
import pic from "./91cca8839fde6b8be674779d22e51f79.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="mainDiv">
      <div className="heroSection">
        <div className="textContent">
          <h2>Unleash Your <span className="spark">Dream </span>Career!</h2>
          <p>Find the perfect job or hire top talents effortlessly.</p>
          <Link to="/login">
            <button className="btn">Explore Now 🚀</button>
          </Link>
        </div>

        <div className="imageContainer">
          <img src={pic} alt="Hero Art" />
        </div>
      </div>
    </div>
  );
}

export default Home;
