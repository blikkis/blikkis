import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Club from "./club";
import Mysteriet from "./mysteriet";
import Admin from "./admin";
import Rolle from "./rolle";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Club />} />
        <Route path="/mysteriet-paa-sicilia" element={<Mysteriet />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/rolle" element={<Rolle />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
