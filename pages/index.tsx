import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "firebase/app";
import "firebase/auth";
import "../components/firebase_config";

import "semantic-ui-css/semantic.min.css";
import { Container, Divider } from "semantic-ui-react";

import SignInScreen from "./login";
import { useRouter } from "next/router";

export default function App() {
  const [text, setText] = useState("");
  useEffect(() => {
    fetch("/api/lyrics").then((response) => {
      response.text().then((data) => {
        setText(data);
      });
    });
  }, []);

  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  let router = useRouter();
  // useEffect(() => {
  //   if (user) {
  //     router.push("/dashboard");
  //   }
  // });

  return (
    <div className="App">
      <header className="App-header">
        {!user ? <SignInScreen /> : router.push("/dashboard")}
        {/* <SignInScreen /> */}
      </header>
      <Divider></Divider>
      <Container text>
        <div>{text}</div>
      </Container>
    </div>
  );
}
