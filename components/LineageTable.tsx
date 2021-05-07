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
  cowIds: Array<any>;
}

function FeedTableRow(props: FeedRowProps) {
  const [cowIds, setCowIds] = useState(props.cowIds);
  const [sire, setSire] = useState(props.row.sire);
  const [cow, setCow] = useState(props.row.cow);
  const [dateBorn, setDateBorn] = useState(props.row.date_bown);
  const [breed, setBreed] = useState(props.row.breed);
  const [comments, setComments] = useState(props.row.comments);

  useEffect(() => {
    axios.post("api/updateLineage", {
      cow_id: props.id,
      sire: sire,
      cow: cow,
      date_bown: dateBorn,
      breed: breed,
      comments: comments,
    });
  }, [sire, cow, dateBorn, breed, comments]);

  return cowIds.length > 0 ? (
    <Table.Row key={props.row["id"]}>
      {Object.entries(props.row as Object).map((entry) => {
        let element = <span>{entry[1]}</span>;
        switch (entry[0]) {
          case "sire":
            element = (
              <Dropdown
                defaultValue={sire}
                options={cowIds}
                onChange={(e, data) => {
                  setSire(data.value);
                }}
              ></Dropdown>
            );
            break;
          case "cow":
            element = (
              <Dropdown
                defaultValue={cow}
                options={cowIds}
                onChange={(e, data) => {
                  setCow(data.value);
                }}
              ></Dropdown>
            );
            break;
          case "breed":
            element = (
              <Input
                fluid
                // loading={updating}
                defaultValue={breed}
                onChange={(e, d) => {
                  setBreed(e.target.value);
                }}
              ></Input>
            );
            break;
          case "comments":
            element = (
              <Input
                fluid
                // loading={updating}
                defaultValue={comments}
                onChange={(e, d) => {
                  setComments(e.target.value);
                }}
              ></Input>
            );
            break;
          default:
            break;
        }
        return (
          <Table.Cell fluid key={entry[0]}>
            {element}
          </Table.Cell>
        );
      })}
    </Table.Row>
  ) : null;
}

export default function LineageTable() {
  const [cows, setCows] = useState([]);
  const [cowIds, setCowIds] = useState([] as Array<any>);
  const [user] = useAuthState(firebase.auth());

  useEffect(() => {
    axios.post("api/getCowsLineage", { owner_id: user?.uid }).then((e) => {
      console.log(e.data);
      let ids = e.data.map((e: any, i: number) => {
        return { key: e.id, text: e.id, value: e.id };
      });
      console.log(ids);
      setCows(e.data);
      setCowIds(ids);
    });
  }, [user]);

  return (
    <Container>
      {cows.length > 0 && user && cowIds.length > 0 ? (
        <Table celled>
          <Table.Header>
            <Table.Row>
              {Object.entries(cows[0]).map((field: any) => {
                return (
                  <Table.HeaderCell key={field[0]}>{field[0]}</Table.HeaderCell>
                );
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {cows.map((row) => {
              return (
                <FeedTableRow
                  key={row["id"]}
                  id={row["id"]}
                  row={row}
                  cowIds={cowIds}
                ></FeedTableRow>
              );
            })}
          </Table.Body>
        </Table>
      ) : (
        <Container>No cows Data</Container>
      )}
    </Container>
  );
}
