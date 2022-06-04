import React from 'react';
import { signOutUser } from '../api/auth';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NaBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: black;
`;

const Group = styled.div`
  display: flex;
`;

export default function Navigation({ user }) {
  return (
    <NaBar className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Group>
          <Link className="nav-link active" to="/home">
            Spice Box
          </Link>
          <Link className="nav-link active" to="/goto">
            Go-To
          </Link>
          <Link className="nav-link active" to="/recipes">
            {user.fullName}&apos;s Cook Book
          </Link>


          <button
            onClick={signOutUser}
            type="button"
            className="btn btn-danger border border-dark"
          >
            <i className="fas fa-sign-out-alt" />
          </button>
        </Group>
      </div>
    </NaBar>
  );
}

Navigation.propTypes = {
  user: PropTypes.shape(PropTypes.obj),
};

Navigation.defaultProps = {
  user: null,
};