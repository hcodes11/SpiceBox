import '../App.css';
import { getAllUserRecipes } from '../api/data/recipeData';
import React, { useEffect, useState } from 'react';
import Recipe from '../components/Recipe';

function Home({ user }) {
  const [recipes, setRecipes] = useState([]);
  // useEffect(() => {
  //   getAllRecipes().then(setRecipes)
  // }, []);
  useEffect(() => {
    let isMounted = true;
    getAllUserRecipes(user.uid).then((recipetArray) => {
      if (isMounted) setRecipes(recipetArray);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  
  return (
    <>
    {recipes.map((recipe) => (
      <Recipe key={recipe.id} recipe={recipe} setRecipes={setRecipes}/>
    ))}
    </>
  );
}

export default Home; 