import { NextApiRequest, NextApiResponse } from "next";
import { dbQuery } from "../../components/dbQuery";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      let query = await dbQuery(
        "select id, date_acquired, date_removed, source, location from cows where id = $1;",
        [req.body["id"]]
      );
      res.status(200).json(query.rows);
    } catch (error) {
      console.log(error.detail);
    }
  } else {
    res.status(400).end();
  }
};
