import auth from './apiKeys';

const signInUser = () => {
  const provider = new auth.GoogleAuthProvider();
  auth().signInWithPopup(provider);
};
const signOutUser = () => new Promise((resolve, reject) => {
  auth().signOut().then(resolve).catch(reject);
});
export { signInUser, signOutUser };