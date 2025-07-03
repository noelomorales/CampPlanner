import { serialize, SerializeOptions } from 'cookie';
import { NextApiRequest } from 'next';

export function adminCookie(opts: SerializeOptions = {}) {
  return serialize('admin', 'yes', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 2,
    ...opts,
  });
}

export function isAuthed(req: NextApiRequest): boolean {
  return req.cookies['admin'] === 'yes';
}
