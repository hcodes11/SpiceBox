import React from 'react';
import { useNavigate } from 'react-router';
import { ButtonGroup } from 'reactstrap';
import { signOutUser } from '../api/data/auth/firebaseLogin';

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <div className="text-center mb-3">
      <ButtonGroup size="lg">
        <button
          onClick={() => navigate('/')}
          type="button"
          className="btn btn-light border border-dark"
        >
          Home
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