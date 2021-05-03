import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "../../components/createClient";
import { Cow } from "../../components/definitions/Cow";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createClient();
  if (req.method === "POST") {
    client.connect();
    const cow = req.body as Cow;
    try {
      await client.query("insert into cows(herd_id, owner_id) values($1, $2)", [
        cow.herd_id,
        cow.owner_id,
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      client.end();
    }
    res.status(200).json({ Response: "Success" });
  } else {
    res.status(400).end();
  }
};
