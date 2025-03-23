// import './App.css'
import Footer from "./components/footer/Footer";
import Job from "./components/GetStarted/job";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/job" element={<Job/>} />
      </Routes>
    </Router>
  );
}

export default App;
