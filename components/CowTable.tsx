import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Header, Input, Table } from "semantic-ui-react";
import { Cow } from "./definitions/Cow";

interface CowTableProps {
  cows: Array<any>;
}

interface CowRowProps {
  id: number;
  row: Array<Cow>;
}
function CowTableRow(props: CowRowProps) {
  const [open, setOpen] = useState(false);
  const [dateRemoved, setDateRemoved] = useState(props.row[1].date_removed);
  const [dateAdded, setDateAdded] = useState(props.row[1].date_acquired);
  const [source, setSource] = useState(props.row[1].source);
  const [location, setLocation] = useState(props.row[1].location);
  const [updating, setUpdating] = useState(false);
  const [locked, setLocked] = useState(false);
  const [cow, setCow] = useState(props.row);

  useEffect(() => {
    if (dateRemoved) {
      setLocked(true);
    }
  }, [cow]);

  const getCow = () => {
    setUpdating(true);
    axios
      .post("/api/getCow", {
        id: props.id,
      })
      .then((e) => {
        setCow(["0", e.data[0]]);
        setUpdating(false);
      });
  };

  const updateCow = () => {
    setUpdating(true);
    axios
      .post("/api/updateCow", {
        date_acquired: dateAdded,
        date_removed: dateRemoved,
        source: source,
        location: location,
        id: props.id,
      })
      .then(() => {
        setUpdating(false);
      });
  };
  const deleteCow = () => {
    setUpdating(true);
    axios
      .post("/api/deleteCow", {
        id: props.id,
      })
      .then((e) => {
        console.log(e);
        setUpdating(false);
        setDateRemoved(e.data.date);
        setLocked(true);
      });
  };
  return (
    <Table.Row key={props.id}>
      {Object.entries(props.row[1] as Cow).map((entry, i) => {
        let element: JSX.Element = <a></a>;
        switch (entry[0]) {
          case "id":
            element = entry[1];
            break;
          case "date_acquired":
            if (dateAdded) element = dateAdded;
            break;
          case "date_removed":
            if (dateRemoved) element = dateRemoved;
            break;

          case "source":
            element = (
              <Form onSubmit={() => updateCow()}>
                <Form.Field>
                  <Input
                    disabled={locked}
                    defaultValue={entry[1]}
                    onChange={(e) => setSource(e.target.value)}
                  ></Input>
                </Form.Field>
              </Form>
            );
            break;
          case "location":
            element = (
              <Form onSubmit={() => updateCow()}>
                <Form.Field>
                  <Input
                    disabled={locked}
                    loading={updating}
                    defaultValue={entry[1]}
                    onChange={(e) => setLocation(e.target.value)}
                  ></Input>
                </Form.Field>
              </Form>
            );
            break;
          default:
            element = entry[1];
            break;
        }
        return (
          <Table.Cell disabled={locked} key={entry[0]}>
            {element}
          </Table.Cell>
        );
      })}
      <Table.Cell disabled={locked}>
        <Button onClick={() => getCow()}>✅</Button>
        <Button onClick={() => deleteCow()}>❌</Button>
      </Table.Cell>
    </Table.Row>
  );
}

export default function CowTable(props: CowTableProps) {
  return props.cows.length > 0 ? (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {props.cows[0].map((field: any) => (
            <Table.HeaderCell key={field.name}>{field.name}</Table.HeaderCell>
          ))}
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.entries(props.cows[1]).map((row) => (
          <CowTableRow
            key={row[0]}
            id={(row[1] as Cow)["id"]}
            row={row as Cow[]}
          ></CowTableRow>
        ))}
      </Table.Body>
    </Table>
  ) : (
    <Header>No Cow Data</Header>
  );
}
