import React, { useEffect, useState } from "react";
import { Container, Form, Header, Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { getSupplierList } from "../components/api/getSupplierList";
import { Supplier } from "../components/definitions/Supplier";
import { Transaction } from "../components/definitions/Transaction";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import "firebase/auth";
import "../components/firebase_config";
import axios from "axios";

const shipping = [
  { key: "slow", text: "Economy (5-7 Days)", value: 10 },
  { key: "fast", text: "Standard (3-4 Days)", value: 20 },
  { key: "faster", text: "Express (1-2 Days)", value: 30 },
];

function FeedOrder() {
  const [user] = useAuthState(firebase.auth());
  const [suppliers, setSuppliers] = useState([] as Array<any>);
  const [quantity, setQuantity] = useState(0);
  const [supplier, setSupplier] = useState(0);
  const [delivery, setDeliveryCost] = useState(0);
  const transaction = {} as Transaction;

  useEffect(() => {
    getSupplierList().then((e: Array<Supplier>) => {
      const _suppliers: Array<any> = [];
      e.map((e, i) => {
        _suppliers.push({ key: e.id, text: e.name, value: i });
      });
      setSuppliers(_suppliers);
    });
  }, []);
  useEffect(() => {
    console.log(suppliers[supplier]);
  });

  return (
    <Container style={{ marginTop: 40 }}>
      <Header>Feed Order Form</Header>
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            type="number"
            label="Quantity"
            placeholder="0"
            onChange={(e, { value }) => {
              console.log(value);
              transaction.quantity = parseInt(value);
              setQuantity(transaction.quantity);
            }}
          />
          <Form.Select
            fluid
            label="Supplier"
            options={suppliers}
            placeholder="Supplier"
            onChange={(e, { value }) => {
              transaction.supplier_id = value as number;
              setSupplier(transaction.supplier_id);
            }}
          />
        </Form.Group>
        <Form.Group inline>
          <Form.Select
            fluid
            label="Shipping"
            options={shipping}
            placeholder="Shipping Speed"
            onChange={(e, { value }) => {
              transaction.delivery_cost = value as number;
              setDeliveryCost(transaction.delivery_cost);
            }}
          />
        </Form.Group>
        <Container>
          <b>Supplier</b>: {suppliers[supplier]?.text}
          <br></br>
          <b>Quantity</b>: $10 x {quantity} = ${10 * quantity}
          <br></br>
          <b>Shipping</b>: ${delivery}
          <br></br>
          <b>Total</b>: ${10 * quantity + delivery}
        </Container>
        <Form.Button
          onClick={() => {
            let t = {
              supplier_id: suppliers[supplier]?.key,
              delivery_cost: delivery,
              quantity: quantity,
              cost: 10 * quantity + delivery,
              owner_id: user?.uid as string,
            };
            axios.post("api/purchaseFeed", t).then(() => {
              alert("Purchased");
            });
          }}
        >
          Submit
        </Form.Button>
      </Form>
    </Container>
  );
}

export default FeedOrder;
