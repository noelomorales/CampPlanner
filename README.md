# Hetch Hetchy Trip-Tracker

This is a minimal prototype built with **Next.js** and **Mapbox GL**. It stores data in [Vercel KV](https://vercel.com/docs/storage/vercel-kv) and exposes a public map with the latest check‑in. The `/admin` page allows editing of the planned route, SAR (search and rescue) metadata, and posting GPS check‑ins.

## Setup

```bash
pnpm install
pnpm dev
```

The repo includes a small `vercel.json` so Vercel runs `pnpm build` and serves
the `.next` output directory when deploying.

Set the following environment variables in Vercel or a local `.env` file:

- `NEXT_PUBLIC_MAPBOX_TOKEN`
- `ADMIN_PW`
- `KV_NAMESPACE` (optional, defaults to `hetchhetchy`)

## Scripts

- `dev` – start development server
- `build` – production build
- `start` – start production server
- `lint` – run ESLint

## Notes

This is not production ready. TODOs include GitHub OAuth, Postgres storage, daily digest email, and offline/PWA support.
