import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StarshipList from "./components/StarshipList";
import StarshipDetail from "./components/StarshipDetail";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StarshipList />} />
        <Route path="/starships/:id" element={<StarshipDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
