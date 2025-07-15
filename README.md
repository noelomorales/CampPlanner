# TrailTales

TrailTales turns the joy of collecting park visits into a living, illustrated story. This Next.js prototype lets partners log each visit, track an active trip, and share a public status link.

## Quick start

```bash
pnpm dev     # start development server
pnpm build   # production build
pnpm start   # run production build
pnpm lint    # ESLint
```

Copy `.env.example` to `.env.local` **before running `pnpm dev` or `pnpm build`** and fill in these variables. These values are baked into the client at build time:

| Name | Purpose |
|------|---------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | **Required.** Your Mapbox public token |
| `ADMIN_PW` | Shared password for `/admin` |
| `KV_REST_API_URL` | Vercel KV REST endpoint |
| `KV_REST_API_TOKEN` | Vercel KV REST token |
| `KV_NAMESPACE` | Optional prefix, defaults to `trailtales` |

## Vision

The project aims to:
- let partners mark parks as visited and watch their completion bar grow;
- publish a shareable "off‑grid" board showing trip dates and route;
- keep the vintage poster vibe throughout the UI.
