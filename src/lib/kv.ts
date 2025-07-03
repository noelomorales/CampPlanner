import { kv } from '@vercel/kv';

export async function getJson<T>(key: string): Promise<T | null> {
  const data = await kv.get(key);
  return data ? (JSON.parse(data as string) as T) : null;
}

export async function setJson<T>(key: string, value: T): Promise<void> {
  await kv.set(key, JSON.stringify(value));
}
