import { NextApiRequest, NextApiResponse } from "next";
import { dbQuery } from "../../components/dbQuery";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const lin = req.body;
    try {
      await dbQuery("DELETE FROM lineage WHERE cow_id = $1;", [lin.cow_id]);
      await dbQuery(
        "INSERT INTO lineage (cow_id, sire, cow, date_born, breed, comments) VALUES ($1, $2, $3, $4, $5, $6);",
        [lin.cow_id, lin.sire, lin.cow, lin.date_born, lin.breed, lin.comments]
      );
      // let query = await dbQuery("select * from milk_data where milk_id = $1;", [
      //   req.body["milk_id"],
      // ]);
      // res.status(200).json(query.rows);
      res.status(200).json({ Response: "Success" });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).end();
  }
};
