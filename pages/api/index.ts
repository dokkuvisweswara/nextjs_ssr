// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59'); 
  res.status(200).json({ name: 'John Doe' })
};

