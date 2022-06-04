import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AppRoutes from './routes/index';
import auth from './api/apiKeys';
import Navigation from './components/Navigation';
import { userExistsInDB } from './data/userData';
import { useNavigate } from 'react-router-dom';
import SignIn from './views/SignIn';

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
        const isAdmin = await authed
          .getIdTokenResult()
          .then((idTokenResult) => idTokenResult.claims.admin);
        const userObj = {
          uid: authed.uid,
          fullName: authed.displayName,
          profilePic: authed.photoURL,
          username: authed.email.split('@')[0],
          isAdmin,
        };
        setUser(userObj);
        sessionStorage.setItem('idToken', authed.accessToken);
        userExistsInDB(authed.accessToken);
      } else if (user || user === null) {
        setUser(false);
        sessionStorage.removeItem('idToken');
        navigate('/');
      }
    });
  }, []);

  return (
    <>
            {user ? (
                <Container>
                    <Navigation user={user} />
                    <AppRoutes user={user} />
                </Container>
            ) : (
                <SignIn user={user} />
            )}
        </>
  );
}

export default App;