# Hetch Hetchy Trip‑Tracker

A simple trip‑tracking prototype. The public page shows your backpacking route and last GPS check‑in; `/admin` lets you update the route, SAR metadata and record check‑ins.

## Setup

```bash
pnpm install
pnpm dev
```

`vercel.json` ensures `pnpm build` runs and Vercel serves the `.next` directory. Add these environment variables in Vercel or a local `.env` file:

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
