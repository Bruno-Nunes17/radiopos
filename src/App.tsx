import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import RegionDetail from "./page/RegionDetail";
import IncidenceDetail from "./page/IncidenceDetail";
import Saved from "./page/Saved";
import About from "./page/About";
import NotFound from "./page/NotFound";
import { DataProvider } from "./context/DataContext";

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/region/:id" element={<RegionDetail />} />
          <Route path="/incidence/:id" element={<IncidenceDetail />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;
