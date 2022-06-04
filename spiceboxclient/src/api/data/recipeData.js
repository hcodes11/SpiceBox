import axios from 'axios';

const dbURL = "https://localhost:5001/api";

const getAllRecipes = async () => {
  const recipe = await axios.get(`${dbURL}/recipe/all`);
  const recipeData = recipe.data;
  return recipeData;
};

export default getAllRecipes;