import firebase from 'firebase/compat/app';

export default function userId() {
  const auth = firebase.auth();
  const user = auth.currentUser?.uid;
  return user;
}