using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpiceBox.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Time { get; set; }
        public bool Favorite { get; set; }
        public string Ingredients { get; set; }
        public string Instructions { get; set; }
        public string Comments { get; set; }
        public int UserId { get; set; }

    }
}
