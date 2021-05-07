import { NextApiRequest, NextApiResponse } from "next";
import { dbQuery } from "../../components/dbQuery";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      let query = await dbQuery(
        "select id, sire, cow, date_born, breed , comments from cows left join lineage l on cows.id = l.cow_id where owner_id = $1 order by id",
        [req.body["owner_id"]]
      );
      res.status(200).json(query.rows);
    } catch (error) {
      console.log(error.detail);
    }
  } else {
    res.status(400).end();
  }
};
