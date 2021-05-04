import { NextApiRequest, NextApiResponse } from "next";
import { dbQuery } from "../../components/dbQuery";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      let query = await dbQuery(
        "select id, date_acquired, date_removed, source, location from cows where herd_id = $1 order by id ;",
        [req.body["herd_id"]]
      );
      res.status(200).json([query.fields, query.rows]);
    } catch (error) {
      console.log(error.detail);
    }
  } else {
    res.status(400).end();
  }
};
