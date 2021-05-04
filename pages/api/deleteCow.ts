import { NextApiRequest, NextApiResponse } from "next";
import { dbQuery } from "../../components/dbQuery";
import { Cow } from "../../components/definitions/Cow";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const date = new Date().toISOString().slice(0, 19).replace("T", " ");
  if (req.method === "POST") {
    const cow = req.body as Cow;
    try {
      await dbQuery("update cows set date_removed = $1 where id = $2", [
        date,
        cow.id,
      ]);
    } catch (error) {
      console.log(error);
    }
    res.status(200).json({ Response: "Success", date: date });
  } else {
    res.status(400).end();
  }
};
