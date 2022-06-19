import { getAllUserRecipes } from '../api/data/recipeData';
import React, { useEffect, useState } from 'react';
import Recipe from '../components/Recipe';
import auth from '../api/data/auth/firebaseConfig';
import styled from 'styled-components';

const Style = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

function Home() {
  const [recipes, setRecipes] = useState([]);
  const fireId = auth.currentUser?.uid;
  
  useEffect(() => {
    let isMounted = true;
    getAllUserRecipes(fireId).then((recipeArray) => {
      if (isMounted) setRecipes(recipeArray);
    });

    return () => {
      isMounted = false;
    };
  }, []);
  
  return (
    <Style>
    {recipes.map((recipe) => (
      <Recipe key={recipe.id} recipe={recipe} setRecipes={setRecipes}/>
    ))}
    </Style>
  );
}

export default Home; 