import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "../../components/createClient";

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
  } finally {
    client.end();
  }
};
