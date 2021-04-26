import '../styles/index.css';
import 'semantic-ui-css/semantic.min.css'
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import SignInScreen from './login';
import firebase from 'firebase';
import Dashboard from './dashboard';
import '../components/firebase_config';
import { Container, Divider, Header } from 'semantic-ui-react';


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
        {(!user) ? <SignInScreen/> : <Dashboard/>}
      </header>
      <Divider></Divider>
      <Container text>
        <div>
          {text}
        </div>
      </Container>
    </div>
  );
}

export default App;
