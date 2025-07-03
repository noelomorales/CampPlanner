
# Hetch Hetchy Trip‑Tracker

A small Next.js prototype. The public page displays your backpacking route and the most recent GPS check‑in. The `/admin` page lets you upload or draw a route, edit SAR (search and rescue) metadata and post new check‑ins.

## Stack & Versions

- node@18
- next@14.2.3
- react@18.2.0
- typescript@5.x
- mapbox-gl@3.3.x
- @mapbox/mapbox-gl-draw@1.5.0
- @vercel/kv@1.x
- zod@3
- zustand@4
- clsx@2
- @tmcw/togeojson@6

## Environment Variables

Set these in Vercel or a local `.env` file:

- `NEXT_PUBLIC_MAPBOX_TOKEN` – Mapbox public token
- `ADMIN_PW` – simple shared secret for admin page
- `KV_NAMESPACE` – optional prefix, defaults to `hetchhetchy`

`vercel.json` runs `pnpm build` and tells Vercel to serve from `.next`.

## Commands

```
pnpm dev    # start development server
pnpm build  # create production build
pnpm start  # run the production build
pnpm lint   # run ESLint
```
=======
=======

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
. 
├─ pages
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

## Data Schema

All keys live under the `KV_NAMESPACE` prefix:

- `route:<tripId>` → GeoJSON FeatureCollection
- `checkins:<tripId>` → array of `{ ts, lat, lon }`
- `sar:<tripId>` → SAR contact and permit info

## Security & Auth

`/api` routes accept updates only when the request has a cookie `admin=yes`. `AuthGate` sets this cookie when the correct password is submitted. The cookie is `HttpOnly`, `SameSite=Lax` and expires after two days.

## Implementation Notes

* `_app.tsx` imports Mapbox and app CSS.
* `DrawControls` lets you upload GPX or GeoJSON files and edit the route on the map.
* The check‑in button uses `navigator.geolocation` and posts to `/api/checkin`.
* `index.tsx` fetches route, check‑ins and SAR info every 60 seconds using SWR.

## TODO

GitHub OAuth, Postgres storage, daily digest emails and offline/PWA support.

## License

MIT
=======
=======
## Notes

This is a quick prototype. TODOs include GitHub OAuth, Postgres storage, daily digest email, and offline/PWA support.
=======
## Notes

This is not production ready. TODOs include GitHub OAuth, Postgres storage, daily digest email, and offline/PWA support.
