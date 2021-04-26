import firebase from 'firebase';
import '../components/firebase_config';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';

const uiConfig = {
  signInFlow: 'popup',
  // signInSuccessUrl: '/dashboard',
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => {
      return false;
    },
  },
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
};

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    console.log("user signed in")
    console.log(user)
    let idToken = await user.getIdToken();

    let req = await axios.post("/api/createUser", {
      id: idToken,
      name: user.displayName,
      email: user.email
    });
  }
  else {
    console.log("user signed out")
  }
});
 
class SignInScreen extends React.Component {
  render() {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }
}


export default SignInScreen