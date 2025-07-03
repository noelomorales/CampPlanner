import type { NextApiRequest, NextApiResponse } from 'next';
import { getJson, setJson } from '@/lib/kv';
import { isAuthed } from '@/lib/auth';
import { z } from 'zod';

const schema = z.object({ features: z.any(), type: z.literal('FeatureCollection') });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tripId = 'default';
  if (req.method === 'GET') {
    const data = await getJson<GeoJSON.FeatureCollection>(`route:${tripId}`);
    return res.status(200).json(data);
  }
  if (req.method === 'PUT') {
    if (!isAuthed(req) && req.body.pw !== process.env.ADMIN_PW) return res.status(401).end();
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    await setJson(`route:${tripId}`, parsed.data);
    return res.status(200).end();
  }
  res.status(405).end();
}
