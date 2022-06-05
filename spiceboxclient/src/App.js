import React, { useState, useEffect } from 'react';
import './App.css';
import Switch from './Switch';
import Navigation from './components/Navigation';
import auth from './api/data/auth/firebaseConfig';
import SignIn from './views/SignIn';

function App() {
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    auth.onAuthStateChanged(async (authed) => {
      if (authed) {
        const userObj = {
          uid: authed.uid,
          fullName: authed.displayName,
          profilePic: authed.photoURL,
          username: authed.email.split('@')[0],          
        };
        setUser(userObj);
      } else if (user || user === null) {
        setUser(false);        
      }
    });
  }, []);
 
  return (
    <>
    {user ? (
    <div className='App'>
      <Navigation user={user} />
      <div className='main-container'>
        <Switch user={user} />
      </div>
    </div>
    ) : (
      <SignIn />
    )}
    </>
  );
}

export default App;
