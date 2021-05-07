import { NextApiRequest, NextApiResponse } from "next";
import { dbQuery } from "../../components/dbQuery";
import { Milk } from "../../components/definitions/Milk";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const feed = req.body;
    try {
      await dbQuery("update feeds " + "set herd_id = $1 where id = $2", [
        feed.herd_id,
        feed.id,
      ]);
      let query = await dbQuery("select * from feeds where id = $1;", [
        feed.id,
      ]);
      res.status(200).json(query.rows);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).end();
  }
};
