import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

const filePath = path.resolve('.', 'public/delicate.txt')
const buffer = fs.readFileSync(filePath)

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Content-Type', 'text/plain')
    res.send(buffer)
}
