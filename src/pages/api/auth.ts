import type { NextApiRequest, NextApiResponse } from 'next';
import { adminCookie } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { pw } = req.body;
  if (pw === process.env.ADMIN_PW) {
    const cookie = adminCookie();
    res.setHeader('Set-Cookie', cookie);
    return res.status(200).end();
  }
  res.status(401).end();
}
