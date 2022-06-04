import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Details from '../views/Details';
import Home from '../views/Home';
// import Favorites from '../views/Favorites';

export default function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route exact path={['/', '/home']} component={Home} />
        <Route exact path="/details/:id" component={Details} />
      </Routes>
    </div>
  );
}