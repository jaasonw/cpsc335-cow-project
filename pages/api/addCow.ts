import { NextApiRequest, NextApiResponse } from "next";
import { dbQuery } from "../../components/dbQuery";
import { Cow } from "../../components/definitions/Cow";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const cow = req.body as Cow;
    try {
      await dbQuery("insert into cows(herd_id, owner_id) values($1, $2)", [
        cow.herd_id,
        cow.owner_id,
      ]);
    } catch (error) {
      console.log(error);
    }
    res.status(200).json({ Response: "Success" });
  } else {
    res.status(400).end();
  }
};
