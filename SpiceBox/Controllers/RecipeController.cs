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
        public RecipeController(IRecipeRepository recipeRepository)
        {
            _recipeRepository = recipeRepository;
        }

        // https://localhost:5001/api/recipe/
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_recipeRepository.GetAll());
        }

        // https://localhost:5001/api/recipe/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var recipe = _recipeRepository.Get(id);
            if (recipe == null)
            {
                return NotFound();
            }
            return Ok(recipe);
        }

        // https://localhost:5001/api/recipe/
        [HttpPost("{id}")]
        public IActionResult Post([FromBody] Recipe recipe)
        {
            _recipeRepository.Add(recipe);
            return CreatedAtAction("Get", new { id = recipe.Id }, recipe);
        }

        // https://localhost:5001/api/recipe/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Recipe recipe)
        {
            if (id != recipe.Id)
            {
                return BadRequest();
            }

            _recipeRepository.Update(recipe);
            return NoContent();
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
