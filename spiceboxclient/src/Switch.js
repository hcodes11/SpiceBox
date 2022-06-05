import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import NewRecipe from './views/NewRecipe';
import Details from './views/Details';

export default function Switch() {
    return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipe' element={<NewRecipe />} />
        <Route path='/details' element={<Details />} />
      </Routes>
  );
}