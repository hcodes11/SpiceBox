import '../App.css';
import { getAllUserRecipes } from '../api/data/recipeData';
import React, { useEffect, useState } from 'react';
import Recipe from '../components/Recipe';
import auth from '../api/data/auth/firebaseConfig';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const fireId = auth.currentUser?.uid;
  useEffect(() => {
    let isMounted = true;
    getAllUserRecipes(fireId).then((recipeArray) => {
      console.warn(fireId);
      if (isMounted) setRecipes(recipeArray);
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