import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const RecipeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 3.5in;
  height: 4.2in;
  padding: 20px;
  border-radius: 1px;
  margin: 25px;
  position: relative;
  z-index: 0;
  transition: transform 0.4s, box-shadow 0.4s;
  &:hover {
    transform: scale(1.05);
  }
`;


export default function Recipe({ taco }) {
 
  return (
    <>
      <RecipeCard>
        <div className="name" style={{ color: 'Grey', fontSize: '20px' }}>
          {taco.name}
        </div>
        
      </RecipeCard>
    </>
  );
}

Recipe.propTypes = {
  taco: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    ingredients: PropTypes.string,
    instructions: PropTypes.string,
    favorite: PropTypes.bool,
  }),
};

Recipe.defaultProps = {
  taco: {},
};