import type { NextApiRequest, NextApiResponse } from 'next';
import { getJson, setJson } from '@/lib/kv';
import { isAuthed } from '@/lib/auth';
import { z } from 'zod';

const schema = z.object({
  contactName: z.string(),
  phone: z.string(),
  permit: z.string(),
  vehicle: z.string(),
  gearNotes: z.string(),
  medicalNotes: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tripId = 'default';
  if (req.method === 'GET') {
    const data = (await getJson<Record<string, string>>(`sar:${tripId}`)) || null;
    return res.status(200).json(data);
  }
  if (req.method === 'PUT') {
    if (!isAuthed(req) && req.body.pw !== process.env.ADMIN_PW) return res.status(401).end();
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    await setJson(`sar:${tripId}`, parsed.data);
    return res.status(200).end();
  }
  res.status(405).end();
}
