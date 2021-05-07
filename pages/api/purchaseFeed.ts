import { NextApiRequest, NextApiResponse } from "next";
import { dbQuery } from "../../components/dbQuery";
import { Transaction } from "../../components/definitions/Transaction";
import { getCurrentDateString } from "../../components/util/date";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const transaction = req.body as Transaction;
    try {
      let t = await dbQuery(
        "insert into transactions (supplier_id, date, delivery_cost, quantity, cost) values($1, $2, $3, $4, $5) returning id",
        [
          transaction.supplier_id,
          getCurrentDateString(),
          transaction.delivery_cost,
          transaction.quantity,
          transaction.cost,
        ]
      );
      // console.log(t.rows);
      await dbQuery(
        "insert into feeds (quantity, owner_id, transaction_id) values($1, $2, $3)",
        [transaction.quantity, transaction.owner_id, t.rows[0].id]
      );
    } catch (error) {
      console.log(error);
    }
    res.status(200).json({ Response: "Success" });
  } else {
    res.status(400).end();
  }
};
