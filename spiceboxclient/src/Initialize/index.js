import React, { useState, useEffect } from 'react';
import auth from '../api/apiKeys';
import styled from 'styled-components';
import SignIn from '../views/SignIn';
import Navigation from '../components/Navigation';
import AppRoutes from '../routes/index';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

function Initialize() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth().onAuthStateChanged((authed) => {
            if (authed) {
                const userInfoObj = {
                    fullName: authed.displayName,
                    profileImage: authed.photoURL,
                    uid: authed.uid,
                    user: authed.email.split('@')[0],
                };
                setUser(userInfoObj);
            } else if (user || user === null) {
                setUser(false);
            }
        });
    }, [user]);

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

export default Initialize;
