import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { deleteRecipe  } from '../api/data/recipeData';
import auth from '../api/data/auth/firebaseConfig';
import { Link } from 'react-router-dom';

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
      <button className="btn btn-light" type="button">{recipe.name}</button>
      <div>
        <Link to={`/edit/${recipe.id}`} className="btn btn-info">
          Edit
        </Link>
        </div>
        <div>
        <Link to={`/details/${recipe.id}`} className="btn btn-info">
          Details
        </Link>
        </div>
      <button onClick={() => handleClick('delete')} className="btn btn-danger" type="button">
          Delete
      </button>
      </Alert>
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