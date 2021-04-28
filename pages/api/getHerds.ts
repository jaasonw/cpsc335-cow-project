import * as admin from "firebase-admin";
import { Client } from "pg";
import { NextApiRequest, NextApiResponse } from "next";

import dotenv from "dotenv";
dotenv.config();

import { adminInit } from "../../components/firebase_admin/admin_config";
import { createClient } from "../../components/createClient";
adminInit();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const client = createClient();
    client.connect();
    try {
      let query = await client.query("select * from herds where owner = $1;", [
        req.body["uid"],
      ]);

      res.status(200).json(query.rows);
    } catch (error) {
      console.log(error.detail);
    } finally {
      client.end();
    }
  } else {
    res.status(400).end();
  }
};
