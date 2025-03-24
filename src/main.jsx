import { StrictMode } from "react";
import { createRoot} from "react-dom/client"
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Routes from './Routes'
import Home from "./components/home/Home";
import About from "./components/about/About";
import Job from "./components/getstarted/Job"
import LoginPage from "./components/getstarted/Login/LoginFile";
import JobSeeker from "./components/getstarted/jobSeeker/JobSeeker";
import Register from "./components/getstarted/Login/Register";
import ProfileManagementForm from "./components/getstarted/jobSeeker/dashboard/ProfileManagementForm";
import JobPoster from "./components/getstarted/jobPoster/JobPoster";
import JobPosterProfile from "./components/getstarted/jobPoster/dashboard/JobPosterProfile";
import PosterDasboard from "./components/getstarted/jobPoster/dashboard/PosterDasboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Routes />}>
      <Route path="" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/job" element={<Job />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/jobSeeker" element={<JobSeeker />} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/ProfileManagement" element={<ProfileManagementForm/>} />
      <Route path="/jobPoster" element={<JobPoster/>} />
      <Route path="/jobPosterProfile" element={<JobPosterProfile/>} />
      <Route path="/posterDashboard" element={<PosterDasboard/>} />

      
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
