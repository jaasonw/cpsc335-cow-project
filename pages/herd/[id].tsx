import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Container, List, Loader, Table } from "semantic-ui-react";
import { QueryResult } from "pg";
import "semantic-ui-css/semantic.min.css";

export default function Herd() {
  const router = useRouter();
  const { id } = router.query;
  const [cows, setCows] = useState([]);

  useEffect(() => {
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
  }, [id]);
  return (
    <Container>
      {!cows[1] ? (
        <Loader inverted></Loader>
      ) : (
        <Table celled>
          <Table.Header>
            <Table.Row>
              {(cows[0] as Array<any>).map((field: any) => (
                <Table.HeaderCell key={field.name}>
                  {field.name}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Object.entries(cows[1]).map((row) => {
              return (
                <Table.Row key={row[0]}>
                  {Object.entries(row[1] as Object).map((entry) => {
                    console.log(row[1]);
                    return <Table.Cell key={entry[0]}>{entry[1]}</Table.Cell>;
                  })}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}
    </Container>
  );
}
