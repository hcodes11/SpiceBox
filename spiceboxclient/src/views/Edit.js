import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleRecipe } from '../api/data/recipeData';
import RecipeForm from '../components/RecipeForm';
import PropTypes from 'prop-types';

export default function Edit({ user }) {
  const [editItem, setEditItem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    getSingleRecipe(id).then((dish) => {
        
    if (isMounted) setEditItem(dish);
    });
    return () => {
      isMounted = false;
    };
  });

  return (
    <div>
      <RecipeForm editRecipe={editItem} user={user}/>
    </div>
  );
}

Edit.propTypes = {
    user: PropTypes.shape(PropTypes.obj).isRequired
};