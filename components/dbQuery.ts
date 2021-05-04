import { Client, QueryResult } from "pg";
import dotenv from "dotenv";
dotenv.config();

export function dbQuery(
  query: string,
  args: Array<any> = []
): Promise<QueryResult> {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  client.connect();
  let res = client
    .query(query, args)
    .then((e) => {
      client.end();
      return e;
    })
    .catch((e) => {
      client.end();
      return e;
    });
  return res;
}
