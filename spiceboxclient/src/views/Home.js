import '../App.css';
import { getAllRecipes } from '../api/data/recipeData';
import React, { useEffect, useState } from 'react';
import Recipe from '../components/Recipe';


function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipes().then(setRecipes)
  }, []);
  
  return (
    <>
    {recipes.map((recipe) => (
      <Recipe key={recipe.name} recipe={recipe} />
    ))}
    </>
  );
}

export default Home;