import { NextApiResponse, NextApiRequest } from 'next'

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<string>
) {
  return res.status(200).json({ version: "0.0.1" })

}
