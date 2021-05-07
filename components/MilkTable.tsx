import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Form,
  Header,
  Input,
  Tab,
  Table,
} from "semantic-ui-react";
import { Cow } from "./definitions/Cow";
import { Milk } from "./definitions/Milk";

interface MilkTableProps {
  milk: Array<Milk>;
  cows: Array<Cow>;
}

interface MilkRowProps {
  id: number;
  row: Milk;
  cows: Array<Cow>;
}

function MilkTableRow(props: MilkRowProps) {
  const [milk, setMilk] = useState(props.row);
  const [cows, setCows] = useState(props.cows);
  const [updating, setUpdating] = useState(false);
  const [cowIds, setCowIds] = useState([] as Array<any>);

  useEffect(() => {
    const cowList: Array<any> = [];
    cows.forEach((e) => {
      cowList.push({ key: e.id, value: e.id, text: e.id });
    });
    setCowIds(cowList);
    console.log(cows);
  }, []);

  const updateMilk = () => {
    setUpdating(true);
    axios.post("/api/updateMilk", milk).then((e) => {
      console.log(e);
      setMilk(e.data[0]);
      setUpdating(false);
    });
  };

  return (
    <Table.Row key={props.row["milk_id"]}>
      {Object.entries(props.row).map((entry) => {
        let element = <span>{entry[1]}</span>;
        switch (entry[0]) {
          case "cow_id":
            element = (
              <Dropdown
                defaultValue={entry[1]}
                options={cowIds}
                onChange={(e) => {
                  milk.cow_id = e.target.innerText;
                  setMilk(milk);
                  updateMilk();
                  // console.log(e.target.innerText);
                }}
              ></Dropdown>
            );
            break;
          case "quantity":
            element = (
              <Input
                fluid
                type="number"
                loading={updating}
                defaultValue={milk.quantity}
                onChange={(e, d) => {
                  milk.quantity = parseInt(e.target.value);
                  setMilk(milk);
                  updateMilk();
                }}
              ></Input>
            );
            break;
          case "comments":
            element = (
              <Input
                fluid
                loading={updating}
                defaultValue={milk.comments}
                onChange={(e, d) => {
                  milk.comments = e.target.value;
                  setMilk(milk);
                  updateMilk();
                }}
              ></Input>
            );

          default:
            // console.log(entry[0]);
            break;
        }
        return <Table.Cell key={entry[0]}>{element}</Table.Cell>;
      })}
      <Table.Cell>
        <Button>✅</Button>
      </Table.Cell>
    </Table.Row>
  );
}

export default function MilkTable(props: MilkTableProps) {
  return (
    <Container>
      {props.milk.length > 0 && props.cows.length > 0 ? (
        <Table celled>
          <Table.Header>
            <Table.Row>
              {Object.entries(props.milk[0]).map((field: any) => {
                return (
                  <Table.HeaderCell key={field[0]}>{field[0]}</Table.HeaderCell>
                );
              })}
              <Table.HeaderCell>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.milk.map((row: Milk) => {
              return (
                // <Table.Row key={row["milk_id"]}>
                //   {Object.entries(row).map((entry) => {
                //     return <Table.Cell key={entry[0]}>{entry[1]}</Table.Cell>;
                //   })}
                // </Table.Row>
                <MilkTableRow
                  key={row["milk_id"]}
                  id={row["milk_id"]}
                  row={row}
                  cows={props.cows}
                ></MilkTableRow>
              );
            })}
          </Table.Body>
        </Table>
      ) : (
        <Container>No Milk Data</Container>
      )}
    </Container>
  );
}
