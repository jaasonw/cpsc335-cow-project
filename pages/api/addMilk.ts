import { NextApiRequest, NextApiResponse } from "next";
import { dbQuery } from "../../components/dbQuery";
import { Milk } from "../../components/definitions/Milk";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const milk = req.body as Milk;
    try {
      await dbQuery("insert into milk_data(cow_id) values($1)", [
        milk.cow_id
      ]);
    } catch (error) {
      console.log(error);
    }
    res.status(200).json({ Response: "Success" });
  } else {
    res.status(400).end();
  }
};
