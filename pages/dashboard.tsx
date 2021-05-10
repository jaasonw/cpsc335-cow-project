import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "firebase/app";
import "firebase/auth";
import "../components/firebase_config";
import { useRouter } from "next/router";
import "semantic-ui-css/semantic.min.css";

import { Button, Container, Header } from "semantic-ui-react";
import axios from "axios";
import HerdList from "../components/HerdList";

function Dashboard() {
  const [user] = useAuthState(firebase.auth());
  const [herds, setHerds] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      axios
        .post("/api/getHerds", {
          uid: user.uid,
        })
        .then((response) => {
          console.log(response.data);
          setHerds(response.data);
        });
    }
  }, [user]);

  return (
    <Container>
      <Container style={{ marginTop: 10 }}>
        <Header as="h3" textAlign="right">
          🤠 Logged in as: {user?.displayName}
          <br></br>
          <a
            onClick={() => {
              firebase.auth().signOut();
              router.push("../");
            }}
          >
            Sign Out
          </a>
        </Header>
      </Container>
      <Container style={{ marginTop: 40 }}>
        <Button
          onClick={() => {
            router.push("/order");
          }}
        >
          Order Feed
        </Button>
        <Button
          onClick={() => {
            router.push("/lineage");
          }}
        >
          Edit Lineage
        </Button>
        <br></br>
        <HerdList herds={herds}></HerdList>
      </Container>
    </Container>
  );
}

export default Dashboard;
