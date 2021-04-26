import firebase from 'firebase';
import './firebase_config';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

function Dashboard() {
  const auth = firebase.auth();
  const [user] = useAuthState(auth);
  return (
    <div>
      <h1>Logged in as: {firebase.auth().currentUser?.displayName}</h1>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}

export default Dashboard