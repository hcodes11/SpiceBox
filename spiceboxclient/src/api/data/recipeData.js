import axios from 'axios';

const dbURL = "https://localhost:5001/api";

const getAllRecipes = async () => {
  const recipe = await axios.get(`${dbURL}/recipe/all`);
  const recipeData = recipe.data;
  return recipeData;
};

// const createRecipe = (recipe) =>
//   new Promise((resolve, reject) => {
//     axios.post(`${dbURL}/recipe`, recipe).then(resolve).catch(reject);
//   });

const createRecipe = (recipeObj) => new Promise ((resolve, reject) => {
    axios.post(`${dbURL}/recipe`, recipeObj)
    .then((response) => {
        if (response.status > 300 || response.status < 200) {
            throw new Error(response.status);
        } else {
            resolve();
        }
    })
    .catch(reject);
})


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
      .then(() => getAllRecipes().then(resolve))
      .catch(reject);
  });

const deleteRecipe = (RecipeId) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`${dbURL}/recipe/id/${RecipeId}`)
      .then(() => getAllRecipes().then(resolve))
      .catch(reject);
  });

export { 
    getAllRecipes, 
    createRecipe, 
    getSingleRecipe, 
    updateRecipe, 
    deleteRecipe 
} ;