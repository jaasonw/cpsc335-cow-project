import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Container,
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
}

interface MilkRowProps {
  id: number;
  row: Milk;
}

export default function MilkTable(props: MilkTableProps) {
  return (
    <Container>
      {props.milk.length > 0 ? (
        <Table celled>
          <Table.Header>
            <Table.Row>
              {Object.entries(props.milk[0]).map((field: any) => {
                return (
                  <Table.HeaderCell key={field[0]}>{field[0]}</Table.HeaderCell>
                );
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.milk.map((row: Milk) => {
              return (
                <Table.Row key={row["milk_id"]}>
                  {Object.entries(row).map((entry) => {
                    return <Table.Cell key={entry[0]}>{entry[1]}</Table.Cell>;
                  })}
                </Table.Row>
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
