using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpiceBox.Models;
using SpiceBox.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpiceBox.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeRepository _recipeRepository;
        private readonly IUserRepository _userRepository;
        public RecipeController(IRecipeRepository recipeRepository, IUserRepository userRepository)
        {
            _recipeRepository = recipeRepository;
            _userRepository = userRepository;
        }

        // https://localhost:5001/api/recipe/all
        [HttpGet("all")]
        public IActionResult Get()
        {
            return Ok(_recipeRepository.GetAll());
        }

        // https://localhost:5001/api/recipe/firebaseId
        [HttpGet("{uid}")]
        public IActionResult Get(string uid)
        {
            List<Recipe> recipes = _recipeRepository.GetAllUserRecipes(uid);
            if (recipes == null)
            {
                return NotFound();
            }
            return Ok(recipes);
        }


        // https://localhost:5001/api/recipe/5
        [HttpGet("Id/{id}")]
        public IActionResult Get(int id)
        {
            var recipe = _recipeRepository.Get(id);
            if (recipe == null)
            {
                return NotFound();
            }
            return Ok(recipe);
        }
        // https://localhost:5001/api/recipe/firebaseId
        //changing to userid from fireid
        //[HttpPost("{fireId}")]
        //public IActionResult Post(string fireId, [FromBody] Recipe recipe)
        //{
        //    //var fireId = User.FindFirst(claim => claim.Type == "user_id").Value;
        //    var user = _userRepository.GetUserByFirebaseID(fireId);
        //    recipe.UserId = user.Id;
        //    _recipeRepository.Add(recipe);
        //    return CreatedAtAction("Get", new { id = recipe.Id }, recipe);
        //}

        //[HttpPost("{userId}")]
        [HttpPost]
        public IActionResult Post([FromBody] Recipe recipe)
        {
            //var fireId = User.FindFirst(claim => claim.Type == "user_id").Value;
            //var user = _userRepository.GetUserByFirebaseID(fireId);
            //var user = _userRepository.GetById(userId);
            //recipe.UserId = user.Id;
            _recipeRepository.Add(recipe);
            return CreatedAtAction("Get", new { id = recipe.Id }, recipe);
        }

        //// https://localhost:5001/api/recipe/5
        //[HttpPut("{id}")]
        //public IActionResult Put(int id, [FromBody] Recipe recipe)
        //{
        //    if (id != recipe.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _recipeRepository.Update(recipe);
        //    return NoContent();
        //}

        // https://localhost:5001/api/recipe/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Recipe recipe)
        {
            Recipe dish = _recipeRepository.Get(id);
            if (dish != null)
            {
                _recipeRepository.Update(recipe);
                return Ok(recipe);
            }
            else
            {
                return BadRequest(recipe);

            }

        }

        // https://localhost:5001/api/recipe/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _recipeRepository.Delete(id);
            return NoContent();
        }
    }
}
