import React from 'react';
import RecipeForm from '../components/RecipeForm';

export default function NewRecipe({user}) {

  //make useeffect here to get user and then pass user to recipe
  
  return (
    <>
       <RecipeForm firebaseUser={user} />
    </>
  );
}