import React from 'react';
import RecipeForm from '../components/RecipeForm';


export default function NewRecipe({user}) {

 return (
  <div>
    
       <RecipeForm firebaseUser={user} />
    
    </div>
  );
}