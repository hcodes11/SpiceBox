import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Recipe = styled.div`
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

const Together = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function DetailsCard({ taco }) {
  return (
    <div>
      <Recipe>
        <div className="title" style={{ color: 'Grey', fontSize: '20px' }}>
          {taco.title}
        </div>
        <div className="card" style={{ width: '200px' }}>
          <img
            className="card-img-top"
            src={taco.imageUrl}
            aria-hidden
            alt={taco.title}
          />
        </div>
        <div className="title" style={{ color: 'Grey', fontSize: '20px' }}>
          {taco.ingredients}
        </div>
        <div className="title" style={{ color: 'Grey', fontSize: '20px' }}>
          {taco.instructions}
        </div>
        <Together>
        <div className="title" style={{ color: 'Grey', fontSize: '20px' }}>
          {taco.time}
        </div>
        <div className="title" style={{ color: 'Grey', fontSize: '20px' }}>
          {taco.comments}
        </div>
        </Together>
      </Recipe>
    </div>
  );
}

DetailsCard.propTypes = {
    taco: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        imageUrl: PropTypes.string,
        time: PropTypes.string,
        ingredients: PropTypes.string,
        instructions: PropTypes.string,
        comments: PropTypes.string,
        userId: PropTypes.number
    }),
  };
  
  DetailsCard.defaultProps = {
    taco: {},
  };
  