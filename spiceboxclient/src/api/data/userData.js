import axios from 'axios';

const dbURL = "https://localhost:5001/api";

const getAllUsers = async () => {
  const user = await axios.get(`${dbURL}/User/all`);
  const userData = user.data;
  return userData;
};

const getSingleUser = (uid) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/User/Id/${uid}`)
      .then((response) => resolve(response.data))
      .catch(reject);
  });

  const getSingleUserByFireId = (uid) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/User/FirebaseId/${uid}`)
      .then((response) => resolve(response.data))
      .catch(reject);
  });

  const createUser = (user) =>
  new Promise((resolve, reject) => {
    axios.post(`${dbURL}/user`, user).then(resolve).catch(reject);
  });

const updateUser = (uid, user) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/user/${uid}`, user)
      .then(() => getSingleUser(uid))
      .then(resolve)
      .catch(reject);
  });

export { getAllUsers, getSingleUser, getSingleUserByFireId, createUser, updateUser };
