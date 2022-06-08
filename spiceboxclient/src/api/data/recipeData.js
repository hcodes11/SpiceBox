import axios from 'axios';
const dbURL = "https://localhost:5001/api";

const getAllRecipes = async () => {
  const recipe = await axios.get(`${dbURL}/recipe/all`);
  const recipeData = recipe.data;
  return recipeData;
};

// const getAllUserRecipes = async (uid) => {
//   const recipe = await axios.get(`${dbURL}/recipe/${uid}`);
//   const recipeData = recipe.data;
//   return recipeData;
// };

const getAllUserRecipes = (uid) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/recipe/${uid}`)
      .then((response) => resolve(Object.values(response.data)))
      .catch(reject);
  });

const createRecipe = (recipe, token) =>
  new Promise((resolve, reject) => {
    axios.post(`${dbURL}/recipe/${token}`, recipe).then(resolve).catch(reject);
  });

  const getSingleRecipe = (RecipeId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/recipe/id/${RecipeId}`)
      .then((response) => resolve(response.data))
      .catch(reject);
  });

  const updateRecipe = (id, recipe) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${dbURL}/recipe/id/${id}`, recipe)
      .then(() => getSingleRecipe().then(resolve))
      .catch(reject);
  });

const deleteRecipe = (RecipeId, uid) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`${dbURL}/recipe/${RecipeId}`)
      .then(() => getAllUserRecipes(uid).then(resolve))
      .catch(reject);
  });

export { 
    getAllRecipes, 
    getAllUserRecipes,
    createRecipe, 
    getSingleRecipe, 
    updateRecipe, 
    deleteRecipe 
} ;