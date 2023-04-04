import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Stocks from "./pages/Stocks";
import Deploy from "./pages/Deploy";
import MarketPlace from "./pages/MarketPlace";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketPlace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/deploy" element={<Deploy />} />
        <Route path="/stocks" element={<Stocks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
