import { NextApiRequest, NextApiResponse } from "next";
import { dbQuery } from "../../components/dbQuery";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      let q = await dbQuery(
        "select id, herd_id, quantity from feeds where owner_id = $1 order by id;",
        [req.body["id"]]
      );
      res.status(200).json(q.rows);
    } catch (e) {
      console.log(e);
      res.status(400).end();
    }
  } else {
    res.status(400).end();
  }
};
