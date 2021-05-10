import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Header, Input, Table } from "semantic-ui-react";
import { Cow } from "./definitions/Cow";

interface CowTableProps {
  cows: Array<Cow>;
}

interface CowRowProps {
  id: number;
  row: Cow;
}
function CowTableRow(props: CowRowProps) {
  const [cow, setCow] = useState(props.row);
  const [dateAdded, setDateAdded] = useState(cow.date_acquired);
  const [dateRemoved, setDateRemoved] = useState(cow.date_removed);
  const [source, setSource] = useState(cow.source);
  const [location, setLocation] = useState(cow.location);

  const [updating, setUpdating] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const updateCow = () => {
    setUpdating(true);
    axios.post("/api/updateCow", cow).then((e) => {
      console.log(e.data[0])
      setCow(e.data[0]);
      setUpdating(false);
    });
  };
  const deleteCow = () => {
    axios.post("/api/deleteCow", cow).then((e) => {
      setCow(e.data[0]);
    });
  };

  useEffect(() => {
    // console.log(cow.source);
    if (cow?.date_removed) setDisabled(true);
    else setDisabled(false);
  }, [cow]);
  return (
    <Table.Row disabled={disabled} key={props.row["id"]}>
      {Object.entries(props.row).map((entry) => {
        let element = <span>{entry[1]}</span>;
        if (cow) {
          switch (entry[0]) {
            case "date_removed":
              element = <span>{cow?.date_removed}</span>;
              break;
            case "source":
              element = (
                <Input
                  loading={updating}
                  disabled={disabled}
                  defaultValue={cow.source}
                  onChange={(e, d) => {
                    cow.source = e.target.value;
                    setCow(cow);
                  }}
                ></Input>
              );
              break;
            case "location":
              element = (
                <Input
                  loading={updating}
                  disabled={disabled}
                  defaultValue={cow.location}
                  onChange={(e, d) => {
                    cow.location = e.target.value;
                    setCow(cow);
                  }}
                ></Input>
              );
              break;
            default:
              break;
          }
        }
        return <Table.Cell key={entry[0]}>{element}</Table.Cell>;
      })}
      <Table.Cell>
        <Button onClick={updateCow}>✅</Button>
        <Button onClick={deleteCow}>❌</Button>
      </Table.Cell>
    </Table.Row>
  );
}

export default function CowTable(props: CowTableProps) {
  const [cows, setCows] = useState(props.cows);

  return props.cows.length > 0 ? (
    <Container>
      <Table celled>
        <Table.Header key="header">
          <Table.Row>
            {Object.entries(props.cows[0]).map((field: any) => {
              return (
                <Table.HeaderCell key={field[0]}>{field[0]}</Table.HeaderCell>
              );
            })}
            <Table.HeaderCell>Edit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.cows.map((row: Cow) => {
            return (
              <CowTableRow
                key={row["id"]}
                id={row["id"]}
                row={row}
              ></CowTableRow>
            );
          })}
        </Table.Body>
      </Table>
    </Container>
  ) : (
    <Header>No Cow Data</Header>
  );
}
