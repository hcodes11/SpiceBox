import React from 'react';
import { signOutUser } from '../api/data/auth/firebaseLogin';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export default function Navigation({user}) {
 
  return (
    <div className="nav-header">
      <div className="container-fluid">
          <Link className='nav-link' to='/'>
            {user.name}&apos;s Recipes
          </Link>
          <Link className='nav-link' to='/recipe'>
          Add a New Recipe
          </Link>
          <button
            onClick={signOutUser}
            type="button"
            className="btn same">
              Sign Out
          </button>
         
      </div>
    </div>
  );
}
Navigation.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Navigation.defaultProps = {
  user: null,
};