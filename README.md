# Hetch Hetchy Trip-Tracker

A minimal Next.js + Mapbox GL prototype.  
The public page (`/`) shows your planned backpacking route and the latest GPS check-in.  
The `/admin` page lets you upload or draw the route, edit SAR (search-and-rescue) metadata, and post new check-ins.

---

## One-line goal
*Show the route and last check-in to friends; allow authenticated updates via `/admin`.*

---

## Stack & versions

| Package | Version |
|---------|---------|
| **node** | 18.x |
| **next** | 14.2.3 |
| **react** | 18.2.0 |
| **typescript** | 5.x |
| **mapbox-gl** | 3.3.x |
| **@mapbox/mapbox-gl-draw** | 1.5.0 |
| **@vercel/kv** | 1.x |
| **zod** | 3.x |
| **zustand** | 4.x |
| **clsx** | 2.x |
| **@tmcw/togeojson** | 6.x |

---

## Environment variables

Set these in Vercel (or a local `.env`):

| Name | Purpose |
|------|---------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | **Public** Mapbox access token (`pk…`) |
| `ADMIN_PW` | Shared password for the `/admin` page |
| `KV_NAMESPACE` | Optional prefix, defaults to `hetchhetchy` |

---

## Commands

```bash
pnpm dev     # start development server
pnpm build   # production build
pnpm start   # run production build
pnpm lint    # ESLint