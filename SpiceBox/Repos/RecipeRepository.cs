using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SpiceBox.Models;

namespace SpiceBox.Repos
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly string _connectionString;
        public RecipeRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<Recipe> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, [Name], ImageUrl, Time, Ingredients, Instructions, Comments, UserId FROM Recipe;";
                    var reader = cmd.ExecuteReader();
                    var recipes = new List<Recipe>();
                    while (reader.Read())
                    {
                        var recipe = new Recipe()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                            Time = reader.GetString(reader.GetOrdinal("Time")),
                            Ingredients = reader.GetString(reader.GetOrdinal("Ingredients")),
                            Instructions = reader.GetString(reader.GetOrdinal("Instructions")),
                            Comments = reader.GetString(reader.GetOrdinal("Comments")),
                            UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                        };
                        recipes.Add(recipe);
                    }

                    reader.Close();

                    return recipes;
                }
            }
        }

        public Recipe Get(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name], ImageUrl, Time, Ingredients, Instructions, Comments, UserId FROM Recipe
                         WHERE Id = @id;";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    Recipe recipe = null;
                    if (reader.Read())
                    {
                        recipe = new Recipe()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                            Time = reader.GetString(reader.GetOrdinal("Time")),
                            Ingredients = reader.GetString(reader.GetOrdinal("Ingredients")),
                            Instructions = reader.GetString(reader.GetOrdinal("Instructions")),
                            Comments = reader.GetString(reader.GetOrdinal("Comments")),
                            UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                        };
                    }

                    reader.Close();

                    return recipe;
                }
            }
        }

        public List<Recipe> GetAllUserRecipes(string uid)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Recipe.Id, Recipe.[Name], ImageUrl, Time, Ingredients, Instructions, Comments, UserId,  [User].FirebaseId
                                        FROM Recipe 
                                        LEFT JOIN [User] ON [User].Id = Recipe.UserId
                                        WHERE [User].FirebaseId =  @uid;";
                    cmd.Parameters.AddWithValue("@uid", uid);

                    var reader = cmd.ExecuteReader();

                    var recipes = new List<Recipe>();
                    while (reader.Read())
                    {
                        var recipe = new Recipe()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                            Time = reader.GetString(reader.GetOrdinal("Time")),
                            Ingredients = reader.GetString(reader.GetOrdinal("Ingredients")),
                            Instructions = reader.GetString(reader.GetOrdinal("Instructions")),
                            Comments = reader.GetString(reader.GetOrdinal("Comments")),
                            UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                        };
                        recipes.Add(recipe);
                    }

                    reader.Close();

                    return recipes;
                }
            }
        }

        public List<Recipe> GetUserIdRecipes(int userid)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, [Name], ImageUrl, Time, Ingredients, Instructions, Comments, UserId
                                        FROM Recipe 
                                        WHERE UserId = @userid;";
                    cmd.Parameters.AddWithValue("@userid", userid);

                    var reader = cmd.ExecuteReader();

                    var recipes = new List<Recipe>();
                    while (reader.Read())
                    {
                        var recipe = new Recipe()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                            Time = reader.GetString(reader.GetOrdinal("Time")),
                            Ingredients = reader.GetString(reader.GetOrdinal("Ingredients")),
                            Instructions = reader.GetString(reader.GetOrdinal("Instructions")),
                            Comments = reader.GetString(reader.GetOrdinal("Comments")),
                            UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                        };
                        recipes.Add(recipe);
                    }

                    reader.Close();

                    return recipes;
                }
            }
        }

        public void Add(Recipe recipe)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Recipe ([Name], ImageUrl, Time, Ingredients, Instructions, Comments, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@name, @imageurl, @time, @ingredients, @instructions, @comments, @userid)";
                    cmd.Parameters.AddWithValue("@name", recipe.Name);
                    cmd.Parameters.AddWithValue("@imageurl", recipe.ImageUrl);
                    cmd.Parameters.AddWithValue("@time", recipe.Time);
                    cmd.Parameters.AddWithValue("@ingredients", recipe.Ingredients);
                    cmd.Parameters.AddWithValue("@instructions", recipe.Instructions);
                    cmd.Parameters.AddWithValue("@comments", recipe.Comments);
                    cmd.Parameters.AddWithValue("@userid", recipe.UserId);
                    recipe.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public void Update(Recipe recipe)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Recipe 
                           SET [Name] = @name, 
                               ImageUrl = @imageurl, 
                               Time = @time,
                               Ingredients=@ingredients,
                               Instructions=@instructions,
                               Comments=@comments,
                               UserId=@userid
                         WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", recipe.Id);
                    cmd.Parameters.AddWithValue("@name", recipe.Name);
                    cmd.Parameters.AddWithValue("@imageurl", recipe.ImageUrl);
                    cmd.Parameters.AddWithValue("@time", recipe.Time);
                    cmd.Parameters.AddWithValue("@ingredients", recipe.Ingredients);
                    cmd.Parameters.AddWithValue("@instructions", recipe.Instructions);
                    cmd.Parameters.AddWithValue("@comments", recipe.Comments);
                    cmd.Parameters.AddWithValue("@userid", recipe.UserId);

                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Recipe WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public List<Recipe> Search(string term)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Recipe.Id, Recipe.[Name], ImageUrl, Time, Ingredients, Instructions, Comments, UserId, [User].FirebaseId
                                        FROM Recipe 
                                        LEFT JOIN [User] ON [User].Id = Recipe.UserId
                                        WHERE Recipe.[Name] LIKE  @term";

                    cmd.Parameters.AddWithValue("@term", $"%{term}%");

                    var reader = cmd.ExecuteReader();

                    var recipes = new List<Recipe>();
                    while (reader.Read())
                    {
                        var recipe = new Recipe()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                            Time = reader.GetString(reader.GetOrdinal("Time")),
                            Ingredients = reader.GetString(reader.GetOrdinal("Ingredients")),
                            Instructions = reader.GetString(reader.GetOrdinal("Instructions")),
                            Comments = reader.GetString(reader.GetOrdinal("Comments")),
                            UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                        };
                        recipes.Add(recipe);
                    }

                    reader.Close();

                    return recipes;
                }
            }
        }


    }
}
    

