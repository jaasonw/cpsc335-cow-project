import { NextApiRequest, NextApiResponse } from "next";
import { dbQuery } from "../../components/dbQuery";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      let q = await dbQuery("select * from herds where owner = $1;", [
        req.body["uid"],
      ]);
      res.status(200).json(q.rows);
    } catch (e) {
      console.log(e)
      res.status(400).end();
    }
  } else {
    res.status(400).end();
  }
};
