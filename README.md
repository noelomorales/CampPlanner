# Hetch Hetchy Trip-Tracker

A simple Next.js app that shows your planned backpacking route and the most recent GPS check-in. The `/admin` page lets you upload or draw the route, edit SAR (search and rescue) metadata and post new check-ins.

## One-line Goal

Public page displays the route and latest check-in. `/admin` allows updating the route, SAR metadata and recording check-ins.

## Stack & Versions

- **node** `18`
- **next** `14.2.3`
- **react** `18.2.0`
- **typescript** `5.x`
- **mapbox-gl** `3.3.x`
- **@mapbox/mapbox-gl-draw** `1.5.0`
- **@vercel/kv** `1.x`
- **zod** `3`
- **zustand** `4`
- **clsx** `2`
- **@tmcw/togeojson** `6`

## Environment Variables

Set these in Vercel (or a `.env` file when developing locally):

- `NEXT_PUBLIC_MAPBOX_TOKEN` – Mapbox public token
- `ADMIN_PW` – shared secret for admin page
- `KV_NAMESPACE` – optional prefix (defaults to `hetchhetchy`)

`vercel.json` runs `pnpm build` and serves the `.next` directory during deployment.

## Commands

```bash
pnpm dev    # run development server
pnpm build  # create production build
pnpm start  # run the production build
pnpm lint   # run ESLint
```

## File Tree & Purpose

```text
.
├─ README.md              # setup and project overview
├─ next.config.mjs        # env passthrough and strict mode
├─ tsconfig.json          # strict + isolatedModules
├─ vercel.json            # Vercel build settings
├─ pages
│  ├─ _app.tsx            # global CSS
│  ├─ index.tsx           # public viewer
│  └─ admin.tsx           # auth gate + admin tools
├─ pages/api
│  ├─ route.ts            # GET/PUT route GeoJSON
│  ├─ checkin.ts          # GET latest / POST new check-in
│  └─ sar.ts              # GET/PUT SAR metadata
├─ components
│  ├─ MapBox.tsx          # map wrapper
│  ├─ DrawControls.tsx    # upload GPX/GeoJSON and draw on map
│  ├─ AuthGate.tsx        # simple password form
│  └─ SarForm.tsx         # emergency contact fields
├─ lib
│  ├─ kv.ts               # wrappers around @vercel/kv
│  └─ auth.ts             # cookie helpers
├─ public
│  └─ .gitkeep            # placeholder for static assets
└─ styles
   ├─ app.css             # minimal layout
   └─ globals.css         # basic reset and color scheme
```

## Data Schema

All keys live under `KV_NAMESPACE`:

- `route:<tripId>` → GeoJSON `FeatureCollection`
- `checkins:<tripId>` → array of `{ ts, lat, lon }`
- `sar:<tripId>` → SAR contact and permit info

## Security & Auth

`/api` routes accept updates only when the request has a cookie `admin=yes`. `AuthGate` sets this cookie when the correct password is provided. The cookie is `HttpOnly`, `SameSite=Lax` and expires after two days.

## Implementation Notes

- `_app.tsx` imports Mapbox GL and application CSS.
- `DrawControls` allows uploading GPX or GeoJSON files and editing the route.
- The check-in button uses `navigator.geolocation` and posts to `/api/checkin`.
- `index.tsx` fetches route, check-in and SAR info with SWR every 60 seconds.
- All API handlers validate input with `zod`.

## README Post‑Generation Checklist

1. `pnpm i`
2. `pnpm dev` – verify pages load
3. `git init && git remote add origin ... && git push`
4. Import repository in Vercel, add env vars, enable KV add-on, deploy
5. Visit `/admin`, enter password, upload/draw route, save SAR, test check-in on mobile

## TODO

Future improvements: GitHub OAuth, Postgres storage, daily digest emails and offline/PWA support.

## License

MIT
