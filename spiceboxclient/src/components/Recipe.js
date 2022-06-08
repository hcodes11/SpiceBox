import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { deleteRecipe } from '../api/data/recipeData';

export default function Recipe({ recipe, setRecipes }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deleteRecipe(recipe.id).then(setRecipes);
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
    userId: PropTypes.number,
  }),
  setRecipes: PropTypes.func.isRequired,
};

Recipe.defaultProps = {
  recipe: {},
};