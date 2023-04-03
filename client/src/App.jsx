import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Stocks from "./pages/Stocks";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Stocks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
