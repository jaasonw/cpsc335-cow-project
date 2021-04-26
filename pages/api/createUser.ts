import * as admin from 'firebase-admin';
import { Client } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next'
import { adminInit } from '../../components/firebase_admin/firebase_admin_config'
import dotenv from 'dotenv';
dotenv.config();

adminInit()

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log(req.body)
    let uid = await admin.auth().verifyIdToken(req.body["id"])
    client.connect();
    try {
      await client.query("INSERT INTO users (id, first_name, email) VALUES ($1, $2, $3);", [uid.uid, req.body["name"], req.body["email"]]);
    } catch (error) {
      console.log(error);
    }
    client.end()
    return res.status(200).json({Response: "Success"});

  } else {
    return res.status(400).end()
  }
}
