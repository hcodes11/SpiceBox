import React from 'react';
import { useNavigate } from 'react-router';
import { ButtonGroup } from 'reactstrap';
import { signOutUser } from '../api/data/auth/firebaseLogin';
import PropTypes from 'prop-types';

export default function Navigation({user}) {
  const navigate = useNavigate();
  
  return (
    <div className="text-center mb-3">
      <ButtonGroup size="lg">
        <button
          onClick={() => navigate('/')}
          type="button"
          className="btn btn-light border border-dark"
        >
          {user.fullName}&apos;s Recipes
        </button>
        <button
          onClick={() => navigate('/recipe')}
          type="button"
          className="btn btn-light border border-dark"
        >
          Add a Recipe
        </button>
        <button type='button' onClick={signOutUser}>Sign Out</button>
      </ButtonGroup>
    </div>
  );
}
Navigation.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Navigation.defaultProps = {
  user: null,
};