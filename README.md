
# Hetch Hetchy Trip‑Tracker

A simple trip‑tracking prototype. The public page shows your backpacking route and last GPS check‑in; `/admin` lets you update the route, SAR metadata and record check‑ins.
=======
# Hetch Hetchy Trip-Tracker

This is a minimal prototype built with **Next.js** and **Mapbox GL**. It stores data in [Vercel KV](https://vercel.com/docs/storage/vercel-kv) and exposes a public map with the latest check‑in. The `/admin` page allows editing of the planned route, SAR (search and rescue) metadata, and posting GPS check‑ins.


## Setup

```bash
pnpm install
pnpm dev
```


`vercel.json` ensures `pnpm build` runs and Vercel serves the `.next` directory. Add these environment variables in Vercel or a local `.env` file:
=======
Set the following environment variables in Vercel or a local `.env` file:


- `NEXT_PUBLIC_MAPBOX_TOKEN`
- `ADMIN_PW`
- `KV_NAMESPACE` (optional, defaults to `hetchhetchy`)

## Scripts

- `dev` – start development server
- `build` – production build
- `start` – start production server
- `lint` – run ESLint


## File Tree

```
.├─ pages
│  ├─ _app.tsx      # global CSS import
│  ├─ index.tsx     # public viewer
│  └─ admin.tsx     # admin tools
├─ pages/api
│  ├─ route.ts      # GET/PUT route
│  ├─ checkin.ts    # GET/POST check‑ins
│  └─ sar.ts        # GET/PUT SAR metadata
├─ components       # MapBox, DrawControls, AuthGate, SarForm
└─ lib              # kv and auth helpers
```

## Notes

This is a quick prototype. TODOs include GitHub OAuth, Postgres storage, daily digest email, and offline/PWA support.
=======
## Notes

This is not production ready. TODOs include GitHub OAuth, Postgres storage, daily digest email, and offline/PWA support.

