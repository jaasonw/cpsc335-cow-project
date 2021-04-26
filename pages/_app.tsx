import '../styles/index.css';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import SignInScreen from './login';
import firebase from 'firebase';
import Dashboard from './dashboard';
import './firebase_config';


function App() {
  const [text, setText] = useState("");
  useEffect(() => {
    fetch("/api/delicate").then(response => {
      response.text().then((data) => {
        setText(data)
      })
    })
  });

  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {text}
        </div>
        {(!user) ? <SignInScreen/> : <Dashboard/>}
      </header>
    </div>
  );
}

export default App;
