import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Pair = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function DetailsCard({ taco }) {
  return (
    <Pair>
        <div className="card" style={{ width: '200px' }}>
          <img
            className="card-img"
            src={taco.imageUrl}
            aria-hidden
            alt={taco.title}
          />
        </div>
        <div className="title" style={{ color: 'aqua', fontSize: '18px' }}>
          {taco.name}
        </div>
        <div className="title" style={{ color: 'Teal', fontSize: '15px' }}>
        Time: 
        <div className="title" style={{ color: 'aqua', fontSize: '18px' }}>
        {taco.time}
        </div>
        </div>
        <div className="title" style={{ color: 'Teal', fontSize: '15px' }}>
         Comments: 
         <div className="title" style={{ color: 'aqua', fontSize: '18px' }}>
        {taco.comments}
        </div>
        </div>
        <div className="textarea" style={{ color: 'Teal', fontSize: '15px' }}>
        Ingredients: 
        <div className="title" style={{ color: 'aqua', fontSize: '18px' }}>
        {taco.ingredients}
        </div>
        </div>
        <div className="textarea" style={{ color: 'Teal', fontSize: '15px' }}>
        Instructions: 
        <div className="title" style={{ color: 'aqua', fontSize: '18px' }}>
        {taco.instructions}
        </div>
        </div>
    </Pair>
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
  