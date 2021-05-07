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
import { Cow } from "../../components/definitions/Cow";

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
  const addMilk = () => {
    axios
      .post("/api/addMilk", {
        cow_id: (cows[0] as Cow).id,
      })
      .then((response) => {
        updateMilk();
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
      {!loadingMilk && !loadingCows ? (
        <Loader inverted></Loader>
      ) : (
        <Container>
          <Button onClick={addCow}>Add Cow</Button>
          <CowTable cows={cows}></CowTable>
          <Button onClick={addMilk}>Add Milk</Button>
          <MilkTable milk={milk} cows={cows}></MilkTable>
        </Container>
      )}
    </Container>
  );
}
