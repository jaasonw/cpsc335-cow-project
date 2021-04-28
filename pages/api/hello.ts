import type { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { Client } from "pg";
import { createClient } from "../../components/createClient";

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let client = createClient();
  client.connect();
  try {
    let query = await client.query(
      "select * from users where id like 'asdf%';"
    );
    console.log(query.rows);
    if (query.rows.length > 0) return res.status(200).json(query.rows);
    else return res.status(404).end();
  } catch (error) {
    console.log(error);
  }
  client.end();
};
