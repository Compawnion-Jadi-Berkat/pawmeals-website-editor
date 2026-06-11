---
title: Pawmeals Sanity Studio Deployment Fix Handoff
date: 2026-05-07
tags:
  - pawmeals
  - sanity
  - vercel
  - frontend
status: verified-locally
---

# Pawmeals Sanity Studio Deployment Fix Handoff

## Summary

The issue was caused by two separate Studio paths being mixed together. The repository root uses **Sanity v4** for the embedded Next.js Studio route, while the `studio/` folder is the standalone **Sanity v5** Studio intended for `pawmeals-studio.sanity.studio`. Deploying Sanity from the repo root would therefore keep the hosted Studio on v4, even if the `studio/` folder contains v5.

The Vercel `/studio` issue was also configuration-related. The embedded Next.js Studio route exists and builds, but the root `sanity.config.ts` did not define `basePath: "/studio"`, which can cause Sanity Studio routing to interpret `/studio` as an unknown tool path and show **“tool not found.”**

## Changes Applied

| File | Change |
|---|---|
| `package.json` | Changed `sanity:deploy` to run `npm --prefix studio run deploy`, so the default deploy command now deploys the standalone v5 Studio. |
| `package.json` | Added `sanity:deploy:root-v4` as an explicit legacy command for the root v4 Studio, preventing accidental v4 redeploys. |
| `sanity.config.ts` | Added `basePath: "/studio"` for the embedded Next.js Studio route. |
| `src/app/studio/[[...tool]]/page.tsx` | Updated misleading comments so the embedded route is not described as v5 when it uses the root dependency set. |
| `tsconfig.json` | Excluded `studio/` from root Next.js type-checking to prevent Sanity v4/v5 type collisions. |
| `studio/package.json` | Updated `styled-components` from `^6.1.0` to `^6.1.15` to satisfy Sanity v5 peer expectations. |
| `.gitignore` | Added ignores for generated standalone Studio build/runtime artifacts. |
| `studio/package-lock.json` | Added lockfile for reproducible standalone Studio v5 installs and deploys. |

## Verification Results

Both deploy paths were verified locally after the fixes.

| Verification | Result |
|---|---|
| `cd studio && npm run build` | Passed. Standalone Sanity v5 Studio builds successfully. |
| `npm run build` from repo root | Passed. Next.js app builds successfully and includes `/studio/[[...tool]]`. |
| `curl -I http://localhost:3000/studio` | Returned `HTTP/1.1 200 OK`. |
| `curl -I http://localhost:3000/studio/structure` | Returned `HTTP/1.1 200 OK`. |
| `curl -I http://localhost:3000/studio/desk` | Returned `HTTP/1.1 200 OK`. |

The only remaining build output is a non-blocking Next.js warning from `next-intl` dynamic import analysis. It does not fail compilation or affect the Studio fix.

## Recommended Deploy Sequence

After the changes are pushed, Vercel should rebuild the Next.js application and the embedded `/studio` route should no longer show the tool-routing error. To update the Sanity-hosted Studio at `pawmeals-studio.sanity.studio`, run the corrected deploy command from the repository root:

```bash
npm run sanity:deploy
```

This now delegates to:

```bash
npm --prefix studio run deploy
```

Use the legacy root v4 deploy command only if intentionally redeploying the old root Studio:

```bash
npm run sanity:deploy:root-v4
```

> [!warning]
> Do not run plain `sanity deploy` from the repository root unless the goal is specifically to deploy the legacy root v4 Studio.
