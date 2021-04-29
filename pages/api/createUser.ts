import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import { adminInit } from "../../components/firebase_admin/admin_config";
import { createClient } from "../../components/createClient";
adminInit();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createClient();
  if (req.method === "POST") {
    let uid = await admin.auth().verifyIdToken(req.body["id"]);
    client.connect();
    try {
      await client.query(
        "INSERT INTO users (id, first_name, email) VALUES ($1, $2, $3);",
        [uid.uid, req.body["name"], req.body["email"]]
      );
    } catch (error) {
      console.log(error.detail);
    } finally {
      client.end();
    }
    res.status(200).json({ Response: "Success" });
  } else {
    res.status(400).end();
  }
};
