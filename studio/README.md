# Pawmeals Studio (Standalone v5)

This directory contains the **standalone Sanity Studio v5** for deployment to `pawmeals-studio.sanity.studio`.

## Architecture

| Studio | Location | Version | URL |
|---|---|---|---|
| **Standalone** (this dir) | `studio/` | Sanity v5 | `pawmeals-studio.sanity.studio` |
| **Embedded** (Vercel) | `src/app/studio/` | Sanity v4 | `your-domain.com/studio` |

Both studios connect to the same dataset (`lr00lxe1/production`) and are always in sync.

## Deploy to Sanity Hosting

```bash
# From the studio/ directory
cd studio
npm install
npx sanity deploy
```

## Local Development

```bash
cd studio
npm install
npm run dev
# Opens at http://localhost:3333
```

## Why Two Studios?

Sanity v5 requires React 19.2+ features (`useEffectEvent`) that conflict with
Next.js 15's App Router server build. The standalone studio runs in its own
isolated environment (no Next.js), so v5 works perfectly there.

The embedded studio on Vercel uses v4 as a fallback — if Sanity's hosting is
unavailable, editors can still access content management at `/studio`.
