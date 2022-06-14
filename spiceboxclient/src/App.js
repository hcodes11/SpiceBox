import React, { useState, useEffect } from 'react';
import './App.css';
import Switch from './Switch';
import Navigation from './components/Navigation';
import auth from './api/data/auth/firebaseConfig';
import SignIn from './views/SignIn';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { checkUserCreatedInDB } from './api/data/userData';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    auth.onAuthStateChanged(async (authed) => {
      if (authed) {
        const userObj = {
          FirebaseId: authed.uid,
          Name: authed.displayName,
          Email: authed.email        
        };
        checkUserCreatedInDB(userObj).then(setUser);
      } else if (user || user === null) {
        setUser(false);  
        navigate('/');      
      }
    });
  }, []);
 
  return (
    <>
    {user ? (
      <Container>
    <div className='App'>
      <Navigation user={user} />
      <div className='main-container'>
        <Switch user={user} />
      </div>
    </div>
    </Container>
    ) : (
      <SignIn />
    )}
    </>
  );
}

export default App;
