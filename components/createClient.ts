import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

export function createClient() {
  return new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}