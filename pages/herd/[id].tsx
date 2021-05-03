import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, Container, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useAuthState } from "react-firebase-hooks/auth";
import CowTable from "../../components/CowTable";
import firebase from "firebase/app";
import "firebase/auth";
import "../../components/firebase_config";

export default function Herd() {
  const [user] = useAuthState(firebase.auth());
  const router = useRouter();
  const { id } = router.query;
  const [cows, setCows] = useState([]);

  const updateCows = () => {
    if (id) {
      axios
        .post("/api/getCowsInHerd", {
          herd_id: id,
        })
        .then((response) => {
          console.log(response.data);
          setCows(response.data);
        });
    }
  };

  const addCow = () => {
    axios
      .post("/api/addCow", {
        herd_id: id,
        owner_id: user?.uid,
      })
      .then((response) => {
        console.log(response.data);
        // setCows(response.data);
        updateCows();
      });
  };

  useEffect(updateCows, [id]);

  return (
    <Container style={{ marginTop: 40 }}>
      <Button onClick={addCow}>Add Cow</Button>
      {!cows[1] ? (
        <Loader inverted></Loader>
      ) : (
        <CowTable cows={cows}></CowTable>
      )}
    </Container>
  );
}
