import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Packages,
  Employees,
  Pilots,
  Services, 
  Locations
} from "./components";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/packages" element={<Packages />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/pilots" element={<Pilots />} />
      <Route path="/services" element={<Services />} />
      <Route path="/locations" element={<Locations />} />
    </Routes>
  </Router>
);