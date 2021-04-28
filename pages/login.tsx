import React from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "../components/firebase_config";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import axios from "axios";

import { Container } from "semantic-ui-react";

const uiConfig = {
  signInFlow: "popup",
  // signInSuccessUrl: '/dashboard',
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
};

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    console.log("user signed in");
    console.log(user);
    let idToken = await user.getIdToken();

    let req = await axios.post("/api/createUser", {
      id: idToken,
      name: user.displayName,
      email: user.email,
    });
  } else {
    console.log("user signed out");
  }
});

class SignInScreen extends React.Component {
  render() {
    return (
      <Container textAlign="center">
        <h1>Helloooooooo this is a wip cow project 🐄🤠</h1>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Container>
    );
  }
}

export default SignInScreen;
