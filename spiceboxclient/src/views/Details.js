import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailsCard from '../components/DetailsCard';
import { getSingleRecipe } from '../api/data/recipeData';

export default function Details() {
  const [details, setDetails] = useState({});
  const { recipeId } = useParams();

   useEffect(() => {
    let isMounted = true;
    getSingleRecipe(recipeId).then((dish) => {
      if (isMounted) setDetails(dish);
    });
    return () => {
      isMounted = false;
    };
  });

  return (
    <>
      <DetailsCard taco={details} />
    </>
  );
}