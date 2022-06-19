import React, { useState } from 'react';
import PropTypes from 'prop-types';

const dbURL = process.env.REACT_APP_DBURL;
const searchUrl = `${dbURL}/recipe/search?q=`;

export default function SearchRecipe({ setRecipes }) {
 
  const [search, setSearch] = useState('');

  const handleOnChange = (event) => {
    setSearch(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    fetch(searchUrl + search)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.results);
      });
  };

  return (
    <div className="jumbotron">
      <form onSubmit={handleOnSubmit}>
        <input
          className="form-control form-control-lg me-1 search"
          type="search"
          placeholder="Search for a Recipe here"
          onChange={handleOnChange}
          value={search}
        />
      </form>
    </div>
  );
}

SearchRecipe.propTypes = {
  setRecipes: PropTypes.func.isRequired,
};