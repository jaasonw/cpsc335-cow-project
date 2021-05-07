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
      let query = await dbQuery(
        "select milk_id, id as cow_id, quantity, date, comments from cows " +
          "INNER JOIN milk_data md on cows.id = md.cow_id " +
          " where herd_id = $1 order by milk_id",
        [req.body["herd_id"]]
      );

      res.status(200).json(query.rows);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).end();
  }
};
