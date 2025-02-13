import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<Jobs/>}/>
          <Route path="/browse" element={<Browse/>}/>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/description/:id" element={<JobDescription/>}/> 
           //admin routes
          <Route path="/admin/companies" element={<Companies/>}/>
          <Route path="/admin/companies/create" element={<CompanyCreate/>}/>
          <Route path="/admin/companies/:id" element={<CompanySetup/>}/>
          <Route path="/admin/jobs" element={<AdminJobs/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
