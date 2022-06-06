using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SpiceBox.Models;

namespace SpiceBox.Repos
{
    public class UserRepository : IUserRepository
    {
        private readonly string _connectionString;
        public UserRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }
        public List<User> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, [Name], Email, FirebaseId FROM [User]";
                    var reader = cmd.ExecuteReader();
                    var users = new List<User>();
                    while (reader.Read())
                    {
                        var user = new User()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            FirebaseId = reader.GetString(reader.GetOrdinal("FirebaseId")),
                        };
                        users.Add(user);
                    }

                    reader.Close();

                    return users;
                }
            }
        }
        public User GetUserByFirebaseID(string uid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, [Name], Email, FirebaseId FROM [User] WHERE FirebaseId = @uid;";

                    cmd.Parameters.AddWithValue("@uid", uid);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        User user = new User
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            FirebaseId = reader.GetString(reader.GetOrdinal("FirebaseId")),
                        };
                        return user;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, [Name], Email, FirebaseId FROM [User] WHERE Id = @id;";

                    cmd.Parameters.AddWithValue("@id", id);


                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        User user = new User
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            FirebaseId = reader.GetString(reader.GetOrdinal("FirebaseId")),
                        };
                        return user;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public bool UserExists(string uid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, [Name], Email, FirebaseId FROM [User] WHERE FirebaseId = @uid;";

                    cmd.Parameters.AddWithValue("@uid", uid);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        return true;
                    }
                    else
                    {
                        reader.Close();
                        return false;
                    }
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [User] ([Name], Email, FirebaseId)
                                        OUTPUT INSERTED.Id
                                        VALUES (@name, @email, @firebaseId)";
                    cmd.Parameters.AddWithValue("@name", user.Name);
                    cmd.Parameters.AddWithValue("@email", user.Email);
                    cmd.Parameters.AddWithValue("@firebaseId", user.FirebaseId);
                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [User]
                           SET [Name] = @name, 
                               Email = @email, 
                               FirebaseId = @firebaseid
                         WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", user.Id);
                    cmd.Parameters.AddWithValue("@name", user.Name);
                    cmd.Parameters.AddWithValue("@email", user.Email);
                    cmd.Parameters.AddWithValue("@firebaseid", user.FirebaseId);

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
                    cmd.CommandText = "DELETE FROM [User] WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
