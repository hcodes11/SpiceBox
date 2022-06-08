import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './views/Home';
import NewRecipe from './views/NewRecipe';
import Details from './views/Details';


export default function Switch({user}) {
    return (
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/recipe' element={<NewRecipe user={user} />} />
        <Route path='/details/:recipeId' element={<Details user={user} />} />
      </Routes>
  );
}

Switch.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Switch.defaultProps = {
  user: null,
};