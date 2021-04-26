import * as admin from 'firebase-admin';

var serviceAccount = require("../../cpsc335-cow-project-firebase-adminsdk-ls0oa-2d04968a76.json");


export function adminInit() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  else
    admin.app();
}