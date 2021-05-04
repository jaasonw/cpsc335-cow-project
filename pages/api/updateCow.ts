import { NextApiRequest, NextApiResponse } from "next";
import { dbQuery } from "../../components/dbQuery";
import { Cow } from "../../components/definitions/Cow";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const cow = req.body as Cow;
    try {
      await dbQuery(
        "update cows " +
          "set date_removed = $1, source = $2, location = $3, date_acquired = $4 where id = $5",
        [cow.date_removed, cow.source, cow.location, cow.date_acquired, cow.id]
      );
    } catch (error) {
      console.log(error);
    }
    res.status(200).json({ Response: "Success" });
  } else {
    res.status(400).end();
  }
};
