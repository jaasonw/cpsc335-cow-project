import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import { adminInit } from "../../components/firebase_admin/admin_config";
import { dbQuery } from "../../components/dbQuery";
adminInit();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    let uid = await admin.auth().verifyIdToken(req.body["id"]);
    try {
      await dbQuery(
        "INSERT INTO users (id, first_name, email) VALUES ($1, $2, $3);",
        [uid.uid, req.body["name"], req.body["email"]]
      );
    } catch (error) {
      console.log(error.detail);
    }
    res.status(200).json({ Response: "Success" });
  } else {
    res.status(400).end();
  }
};