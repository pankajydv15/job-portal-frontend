import React, { useEffect, useState } from "react";
import "./job.css";
import axios from "axios";

function Job() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/job");
        setJobs(response.data);
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const openModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <div className="job-container">
      <h2 className="job-title">🔥 Available Job Listings</h2>

      <div className="job-cards">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.companyName}</h3>
              <p>📍 {job.location}</p>
              <p>🏭 {job.industry}</p>
              <button onClick={() => openModal(job)} className="job-btn">
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="loading-text">Fetching jobs...</p>
        )}
      </div>

      {showModal && selectedJob && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{selectedJob.companyName}</h3>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <p><strong>Industry:</strong> {selectedJob.industry}</p>
            <p><strong>Description:</strong> {selectedJob.description}</p>
            <button className="applyNow" onClick={""}>Apply Now</button>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Job;
