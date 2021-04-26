import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

let serviceAccount = JSON.parse(process.env.GCLOUD_KEY || "")

export function adminInit() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  else
    admin.app();
}