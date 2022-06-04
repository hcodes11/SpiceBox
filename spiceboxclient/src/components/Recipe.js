import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

export default function Recipe({ recipe }) {
  return (
    <>
      <Alert color="light">
        {recipe.name}
      </Alert>
    </>
  );
}

Recipe.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};