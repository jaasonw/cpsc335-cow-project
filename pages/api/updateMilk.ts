import { NextApiRequest, NextApiResponse } from "next";
import { dbQuery } from "../../components/dbQuery";
import { Milk } from "../../components/definitions/Milk";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const milk = req.body as Milk;
    try {
      await dbQuery(
        "update milk_data " +
          "set cow_id = $1, quantity = $2, date = $3, comments = $4 where milk_id = $5",
        [milk.cow_id, milk.quantity, milk.date, milk.comments, milk.milk_id]
      );
      let query = await dbQuery("select * from milk_data where milk_id = $1;", [
        req.body["milk_id"],
      ]);
      res.status(200).json(query.rows);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).end();
  }
};
