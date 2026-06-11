---
type: entrypoint
status: active
owner: Eddie Amintohir
project: Pawmeals Website Editor
priority: critical
tags: [ai-entrypoint, pawmeals, handover]
updated: 2026-06-12
---

# 00 Start Here - Future AI Entry Point

This note is the first context file for any future AI agent working on the Pawmeals website. The active production site is a **Next.js App Router** application that renders public website pages from **published Sanity Studio content**. The key lesson from the latest debugging work is that the site must stay Studio-driven, but public published reads must not collapse when Vercel has stale or invalid Sanity environment values.

| First Question | Read This | Then Inspect |
|---|---|---|
| Why is a route blank? | [[Debugging - Blank or Empty Production Page]] | `src/lib/sanity/client.ts`, the route under `src/app/[locale]/...`, and the component returning `null`. |
| Which Studio document controls a page? | [[Page Editing Map]] | `sanity/schemas/*.ts` and `src/lib/sanity/client.ts`. |
| How does content flow from Studio to website? | [[Sanity Studio Source of Truth]] | GROQ query constants and helper functions in `src/lib/sanity/client.ts`. |
| How should a safe code change be made? | [[AI Change Protocol]] | `git status`, `npm run type-check`, and `npm run build`. |
| How is production deployed? | [[Deployment and Verification Runbook]] | GitHub `main`, Vercel deployment status, and live route checks. |
| What packages are installed and at what version? | [[Dependency Status]] | `package.json` version `1.7.1`. |
| How is Shopify connected? | [[Shopify Connection]] | `src/lib/shopify/client.ts` and `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` env var. |
| How is Sanity configured? | [[Sanity CMS Setup]] | `sanity.config.ts`, `src/lib/sanity/client.ts`, and Vercel env vars. |
| What work is still pending? | [[Outstanding Tasks]] | Owner actions, missing schemas, deferred upgrades, feature backlog. |

## Current Production-Fix Context (June 2026)

The latest pushed website source change is **`340a9a6` fix: add pawmeals.co to Next.js image remotePatterns for Shopify custom domain**. It adds `*.pawmeals.co` to `next.config.mjs` image `remotePatterns` so the Next.js Image optimizer can serve product photos from the custom Shopify domain `pawmeals-headless.pawmeals.co` without throwing a hostname configuration error.

The preceding change is **`c24ff57` chore: revert Next.js to 15.5.19, complete Phase B upgrades**. It upgrades Zod to v4.4.3, Lucide React to v1.17.0 (Instagram icon removed — replaced with Camera), and Vitest to v4.1.8. It also reverts a failed Next.js v16 upgrade due to a known upstream regression with `/_global-error` prerender and `useContext` providers.

The change before that is **`a8d0ef4` fix: update Shopify Storefront API version from deprecated 2024-01 to 2025-01**, which updates the Shopify Storefront API version in `src/lib/shopify/client.ts`.

For earlier history: `104d30b` applied the Pawmeals brand palette and nav order. `a0736c9` fixed CMS navigation fallbacks and legacy route aliases. `e790f65` fixed public Sanity reads on production.

> **Future AI instruction:** do not reintroduce hardcoded marketing/product fallback arrays to hide data problems. Structural UI guardrails such as navigation fallbacks and link normalization may exist only to keep global site chrome usable; product, page, testimonial, and campaign content must remain Studio-owned or show a clear empty state/editor guidance.

## Safe Workflow

| Step | Action | Pass Criteria |
|---|---|---|
| 1 | Read this note and [[AI Change Protocol]]. | You know the affected route, schema, query, and component. |
| 2 | Inspect current files before editing. | No assumptions based only on past commits. |
| 3 | Make the smallest change that preserves Studio ownership. | No fake products, placeholder hero slides, or hidden static content; structural navigation guardrails must stay separate from business content. |
| 4 | Run `npm run type-check` and `npm run build`. | Both pass locally before committing. |
| 5 | Push to GitHub `main` only after validation. | Vercel receives a verified change. |
| 6 | Verify the live URL with a cache-busting query string. | Browser and HTML checks show content. |
| 7 | Update this vault with any new context. | Future agents have accurate operational context. |
