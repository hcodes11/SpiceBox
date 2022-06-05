import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import NewRecipe from './views/NewRecipe';

export default function Switch() {
    return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipe' element={<NewRecipe />} />
      </Routes>
  );
}