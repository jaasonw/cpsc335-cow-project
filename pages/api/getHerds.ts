import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { createClient } from "../../components/createClient";
dotenv.config();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const client = createClient();
    client.connect();
    try {
      let query = await client.query("select * from herds where owner = $1;", [
        req.body["uid"],
      ]);

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
