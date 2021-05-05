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
import MilkTable from "../../components/MilkTable";

export default function Herd() {
  const [user] = useAuthState(firebase.auth());
  const router = useRouter();
  const { id } = router.query;
  const [cows, setCows] = useState([]);
  const [milk, setMilk] = useState([]);
  const [loadingMilk, setLoadingMilk] = useState(true);
  const [loadingCows, setLoadingCows] = useState(true);

  const updateCows = () => {
    if (id) {
      axios
        .post("/api/getCowsInHerd", {
          herd_id: id,
        })
        .then((response) => {
          setCows(response.data);
          setLoadingCows(false);
        });
    }
  };

  const updateMilk = () => {
    if (id) {
      axios
        .post("/api/getMilkData", {
          herd_id: id,
        })
        .then((response) => {
          setMilk(response.data);
          setLoadingMilk(true);
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
        updateCows();
      });
  };

  useEffect(() => {
    updateMilk();
    updateCows();
    setLoadingMilk(true);
    setLoadingCows(true);
  }, [id]);

  return (
    <Container style={{ marginTop: 40 }}>
      <Button onClick={addCow}>Add Cow</Button>
      {!loadingMilk && !loadingCows ? (
        <Loader inverted></Loader>
      ) : (
        <Container>
          <CowTable cows={cows}></CowTable>
          <MilkTable milk={milk}></MilkTable>
        </Container>
      )}
    </Container>
  );
}
