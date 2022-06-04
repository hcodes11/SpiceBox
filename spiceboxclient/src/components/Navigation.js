import React from 'react';
import { useNavigate } from 'react-router';
import { ButtonGroup } from 'reactstrap';

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
      </ButtonGroup>
    </div>
  );
}