using SpiceBox.Models;
using System.Collections.Generic;

namespace SpiceBox.Repos
{
    public interface IUserRepository
    {
        void Add(User user);
        void Delete(int id);
        List<User> GetAll();
        User GetById(int id);
        User GetUserByFirebaseID(string firebaseId);
        void Update(User user);
        bool UserExists(string firebaseId);
    }
}