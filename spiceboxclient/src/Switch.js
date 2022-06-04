import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";

export default function Switch() {
    return (
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
  );
}