import React from 'react';
import RecipeForm from '../components/RecipeForm';

export default function NewRecipe({user}) {
  return (
    <>
       <RecipeForm user={user} />
    </>
  );
}