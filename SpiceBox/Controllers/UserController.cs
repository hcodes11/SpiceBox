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
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // https://localhost:5001/api/user/
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userRepository.GetAll());
        }

        // https://localhost:5001/api/user/5
        [HttpGet("{firebaseId}")]
        public IActionResult Get(string firebaseId)
        {
            var user = _userRepository.GetUserByFirebaseID(firebaseId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // https://localhost:5001/api/user/
        [HttpPost("{id}")]
        public IActionResult Post([FromBody] User user)
        {
            _userRepository.Add(user);
            return CreatedAtAction("Get", new { id = user.Id }, user);
        }

        // https://localhost:5001/api/user/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = _userRepository.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // https://localhost:5001/api/user/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _userRepository.Update(user);
            return NoContent();
        }

        // https://localhost:5001/api/user/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userRepository.Delete(id);
            return NoContent();

        }
    }
}
