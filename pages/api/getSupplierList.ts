import type { NextApiRequest, NextApiResponse } from "next";
import { dbQuery } from "../../components/dbQuery";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let query = await dbQuery("select * from suppliers;");
    if (query.rows.length > 0) {
      res.setHeader("Content-Type", "text/plain");
      return res.status(200).json(query.rows);
    } else return res.status(404).end();
  } catch (error) {
    console.log(error);
  }
};
