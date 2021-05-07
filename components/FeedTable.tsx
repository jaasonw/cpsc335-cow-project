import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown, Input, Table } from "semantic-ui-react";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import "firebase/auth";
import "../components/firebase_config";

interface FeedRowProps {
  id: number;
  row: any;
}

function FeedTableRow(props: FeedRowProps) {
  const [user] = useAuthState(firebase.auth());
  const [herdList, setHerdList] = useState([]);
  const [herdId, setHerdId] = useState(props.row.herd_id);

  useEffect(() => {
    axios.post("api/getHerds", { uid: user?.uid }).then((e) => {
      let herds = e.data.map((e: any) => {
        return { key: e.id, text: e.id, value: e.id };
      });
      setHerdList(herds);
    });
  }, [user]);

  useEffect(() => {
    axios.post("api/updateFeed", {
      id: props.id,
      herd_id: herdId,
    });
    console.log(herdId);
  }, [herdId]);
  return (
    <Table.Row key={props.row["id"]}>
      {Object.entries(props.row as Object).map((entry) => {
        let element = <span>{entry[1]}</span>;
        switch (entry[0]) {
          case "herd_id":
            element = (
              <Dropdown
                defaultValue={herdId}
                options={herdList}
                onChange={(e, data) => {
                  console.log(data.value);
                  setHerdId(data.value);
                }}
              ></Dropdown>
            );
            break;
          default:
            break;
        }
        return <Table.Cell key={entry[0]}>{element}</Table.Cell>;
      })}
    </Table.Row>
  );
}

export default function FeedTable() {
  const [feed, setFeed] = useState([]);
  const [user] = useAuthState(firebase.auth());

  useEffect(() => {
    axios.post("api/getFeeds", { id: user?.uid }).then((e) => {
      console.log(e.data);
      setFeed(e.data);
    });
  }, [user]);

  return (
    <Container>
      {feed.length > 0 && user ? (
        <Table celled>
          <Table.Header>
            <Table.Row>
              {Object.entries(feed[0]).map((field: any) => {
                return (
                  <Table.HeaderCell key={field[0]}>{field[0]}</Table.HeaderCell>
                );
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {feed.map((row) => {
              return (
                <FeedTableRow
                  key={row["id"]}
                  id={row["id"]}
                  row={row}
                ></FeedTableRow>
              );
            })}
          </Table.Body>
        </Table>
      ) : (
        <Container>No Feed Data</Container>
      )}
    </Container>
  );
}
