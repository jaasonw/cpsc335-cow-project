import { NextApiRequest, NextApiResponse } from "next";
import { dbQuery } from "../../components/dbQuery";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      let query = await dbQuery(
        "select milk_id, id as cow_id, quantity, date, comments from cows " +
          "INNER JOIN milk_data md on cows.id = md.cow_id " +
          " where herd_id = $1 order by milk_id",
        [req.body["herd_id"]]
      );

      res.status(200).json(query.rows);
    } catch (error) {
      console.log(error.detail);
    }
  } else {
    res.status(400).end();
  }
};
