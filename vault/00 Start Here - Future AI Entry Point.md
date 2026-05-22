---
type: entrypoint
status: active
owner: Eddie Amintohir
project: Pawmeals Website Editor
priority: critical
tags: [ai-entrypoint, pawmeals, handover]
updated: 2026-05-22
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

## Current Production-Fix Context

The latest pushed website source change is `104d30b Apply Pawmeals brand palette and nav order`. It updates the frontend theme tokens to the Pawmeals external brand palette while preserving the existing luxury glass, lens, and gradient direction. It also enforces the public navigation order so **Quiz** appears immediately after **Katering**, including when navigation comes from Sanity `siteSettings`.

The preceding routing resilience fix is `a0736c9 Fix CMS navigation fallbacks and legacy route aliases`. It adds a structural navigation/footer fallback for the narrow case where published `siteSettings` navigation is missing, and it normalizes legacy Studio-authored links such as `/vet-exclusive` and `/pawrenting` to implemented public routes. The earlier production Sanity-read fix is `e790f65 Fix public Sanity reads on production`, which made published reads independent from a private `SANITY_API_TOKEN` and preserved canonical fallback behavior for the Pawmeals Sanity project `lr00lxe1` and dataset `production`.

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
