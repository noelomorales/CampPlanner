import type { NextApiRequest, NextApiResponse } from 'next';
import { getJson, setJson } from '@/lib/kv';
import { isAuthed } from '@/lib/auth';
import { z } from 'zod';

const schema = z.object({ lat: z.number(), lon: z.number() });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tripId = 'default';
  if (req.method === 'GET') {
    const list = (await getJson<any[]>(`checkins:${tripId}`)) || [];
    return res.status(200).json(list[list.length - 1] || null);
  }
  if (req.method === 'POST') {
    if (!isAuthed(req) && req.body.pw !== process.env.ADMIN_PW) return res.status(401).end();
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const list = (await getJson<any[]>(`checkins:${tripId}`)) || [];
    const entry = { ts: Date.now(), ...parsed.data };
    list.push(entry);
    await setJson(`checkins:${tripId}`, list);
    return res.status(200).json(entry);
  }
  res.status(405).end();
}
