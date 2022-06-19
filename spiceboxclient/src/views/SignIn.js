import React from 'react';
import { signInUser } from '../api/data/auth/firebaseLogin';


export default function SignIn() {

  return (
    <>
      <div className="text-center mt-5">
        <h1 className="App-title">Welcome to Spice Box!</h1>
        <h2>Developed by Harika</h2>
        <button type="button" className="btn btn-success" onClick={signInUser}>
          Login to add your Recipes!
        </button> 
      </div>
      
    </>
  );
}