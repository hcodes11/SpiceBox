import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { deleteRecipe  } from '../api/data/recipeData';
import auth from '../api/data/auth/firebaseConfig';

export default function Recipe({ recipe, setRecipes}) {
  const fireId = auth.currentUser?.uid;
  const handleClick = (method) => {
    if (method === 'delete') {
      deleteRecipe(recipe.id, fireId).then(setRecipes);
    }
  }

  return (
    <>
      <Alert color="light">
        {recipe.name}
      </Alert>
      <button onClick={() => handleClick('delete')} className="btn btn-danger" type="button">
          Delete
        </button>
    </>
  );
}

Recipe.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    time: PropTypes.string,
    ingredients: PropTypes.string,
    instructions: PropTypes.string,
    comments: PropTypes.string,
    userId: PropTypes.number
  }).isRequired,
  setRecipes: PropTypes.func.isRequired,
};

Recipe.defaultProps = {
  recipe: {},
};