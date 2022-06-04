import axios from 'axios';
import auth from "./apiKeys";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const dbURL = "https://localhost:5001/api";

/**
 * Checks if user exists on login using token, and creates user if not.
 * @async GET
 * @return {void}
 */
const userExistsInDB = async () => {
  const token = sessionStorage.getItem('idToken');
  await axios.get(`${dbURL}/Customer/Auth`, {
    headers: { Authorization: 'Bearer ' + token, idToken: token },
  });
};

/**
 * Retrieves all user orders.
 * @async GET
 * @return {Array} Array-Order Objects
 */
 const signInUser = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  
  const signOutUser = () =>
    new Promise((resolve, reject) => {
      getAuth().signOut().then(resolve).catch(reject);
    });

export { userExistsInDB, signInUser, signOutUser };