import React from 'react';
import PropTypes from 'prop-types';
import { deleteRecipe  } from '../api/data/recipeData';
import auth from '../api/data/auth/firebaseConfig';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
padding: 2px;
border-radius: 1px;
margin: 5px;
position: relative;
z-index: 0;
transition: transform 0.4s, box-shadow 0.4s;
&:hover {
  transform: scale(1.05);
}
`;

const Together = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function Recipe({ recipe, setRecipes}) {
  const fireId = auth.currentUser?.uid;
  const handleClick = (method) => {
    if (method === 'delete') {
      deleteRecipe(recipe.id, fireId).then(setRecipes);
    }
  }

  return (
    <>
      <Card>
      <div className="title" style={{ color: 'Teal', fontSize: '20px' }}>{recipe.name}</div>
      <div className="card" style={{ width: '200px' }}>
          <img
            className="card-img-top"
            src={recipe.imageUrl}
            aria-hidden
            alt={recipe.name}
          />
        </div>
        <Together>
          <Link to={`/edit/${recipe.id}`} className="nav-link" style={{ color: 'Teal', fontSize: '20px' }}>
          Edit
          </Link>
          <Link to={`/details/${recipe.id}`} className="nav-link" style={{ color: 'Teal', fontSize: '20px' }}>
            Details
          </Link>
          <button onClick={() => handleClick('delete')} className="btn same" type="button" style={{ color: 'Teal', fontSize: '20px' }}>
          Delete
      </button>
      </Together>
      </Card>
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