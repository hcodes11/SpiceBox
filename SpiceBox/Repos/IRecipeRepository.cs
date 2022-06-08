using SpiceBox.Models;
using System.Collections.Generic;

namespace SpiceBox.Repos
{
    public interface IRecipeRepository
    {
        void Add(Recipe recipe);
        void Delete(int id);
        Recipe Get(int id);
        List<Recipe> GetAll();
        List<Recipe> GetAllUserRecipes(string uid);
        List<Recipe> GetUserIdRecipes(int userid);
        void Update(Recipe recipe);
    }
}