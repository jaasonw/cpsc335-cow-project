import type { NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    client.connect();
    try {
        let query = await client.query("select * from taylor_swift;")
        client.end();
        if (query.rows.length > 0) {
            res.setHeader('Content-Type', 'text/plain')
            return res.status(200).json(query.rows[Math.floor(Math.random() * query.rows.length)].lyrics)
        }
        else
            return res.status(404).end()
    } catch (error) {
        console.log(error)
        client.end()
    }
    client.end()
}