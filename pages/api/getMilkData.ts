import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { createClient } from "../../components/createClient";
dotenv.config();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const client = createClient();
    client.connect();
    try {
      let query = await client.query(
        "select milk_id, id as cow_id, quantity, date, comments from cows " +
          "INNER JOIN milk_data md on cows.id = md.cow_id " +
          " where herd_id = $1 order by milk_id",
        [req.body["herd_id"]]
      );

      res.status(200).json(query.rows);
    } catch (error) {
      console.log(error.detail);
    } finally {
      client.end();
    }
  } else {
    res.status(400).end();
  }
};
