import axios from 'axios';

const dbURL = "https://localhost:5001/api";

const getAllUsers = async () => {
  const user = await axios.get(`${dbURL}/User/all`);
  const userData = user.data;
  return userData;
};

export default getAllUsers;