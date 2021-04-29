import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "firebase/app";
import "firebase/auth";
import "../components/firebase_config";
import { useRouter } from "next/router";
import "semantic-ui-css/semantic.min.css";

import {
  Button,
  Card,
  Container,
  Image,
  Grid,
  Divider,
} from "semantic-ui-react";
import axios from "axios";

function Dashboard() {
  const auth = firebase.auth();
  const [user] = useAuthState(auth);
  const [herds, setHerds] = useState<any[]>([]);

  let router = useRouter();

  useEffect(() => {
    if (user) {
      console.log(auth.currentUser?.uid);
      axios
        .post("/api/getHerds", {
          uid: auth.currentUser?.uid,
        })
        .then((response) => {
          console.log(response.data);
          setHerds(response.data);
        });
    }
  }, [user]);

  return (
    <Container>
      <div>
        <h1>🤠 Logged in as: {firebase.auth().currentUser?.displayName}</h1>
        <Button
          onClick={() => {
            firebase.auth().signOut();
            router.push("../");
          }}
        >
          Sign Out
        </Button>
      </div>
      <Grid stackable columns={3}>
        {herds.map((herd) => {
          return (
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Image src="https://i.pinimg.com/originals/28/6e/af/286eaf4bfad4c26c0fe0ba91dbb050c7.jpg"></Image>
                  <Divider></Divider>
                  <Card.Header>ID: {herd.id}</Card.Header>
                  <Card.Description>
                    Last Fed: {herd.feed_time}
                    <br></br>
                    Waste: {herd.waste}
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          );
        })}
      </Grid>
    </Container>
  );
}

export default Dashboard;
