import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import RegionDetail from "./page/RegionDetail";
import IncidenceDetail from "./page/IncidenceDetail";
import Saved from "./page/Saved";
import About from "./page/About";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/region/:id" element={<RegionDetail />} />
        <Route path="/incidence/:id" element={<IncidenceDetail />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
