import React, { useEffect, useState } from 'react';
import Recipe from '../components/Recipe';
import styled from 'styled-components';

const url = "https://localhost:5001/api/Recipe/all";
const HomeStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const RecipeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  return (
    <HomeStyle>
      <div className="jumbotron">
      </div>
      <RecipeContainer>
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} taco={recipe} setMovies={setRecipes} />
        ))}
      </RecipeContainer>
    </HomeStyle>
  );
}