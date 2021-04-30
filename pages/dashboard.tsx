import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "firebase/app";
import "firebase/auth";
import "../components/firebase_config";
import { useRouter } from "next/router";
import "semantic-ui-css/semantic.min.css";

import { Button, Container, Grid } from "semantic-ui-react";
import axios from "axios";
import CowCard from "../components/cowCard";

function Dashboard() {
  const [user] = useAuthState(firebase.auth());
  const [herds, setHerds] = useState<any[]>([]);

  let router = useRouter();

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
      <div>
        <h1>🤠 Logged in as: {user?.getIdToken()}</h1>
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
              <CowCard
                id={herd.id}
                feed_time={herd.feed_time}
                waste={herd.waste}
              ></CowCard>
            </Grid.Column>
          );
        })}
      </Grid>
    </Container>
  );
}

export default Dashboard;
