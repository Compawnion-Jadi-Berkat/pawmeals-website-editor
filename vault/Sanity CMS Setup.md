---
type: integration-note
status: active
owner: Eddie Amintohir
project: Pawmeals Website Editor
subsystem: sanity
tags: [sanity, cms, studio, schemas, env-vars]
updated: 2026-06-12
---
# Sanity CMS Setup

This note documents the full Sanity CMS configuration — project details, studio surfaces, schema types, and required environment variables.

## Project Details

| Setting | Value |
|---|---|
| Sanity project ID | `lr00lxe1` |
| Dataset | `production` |
| Hosted Studio URL | `https://pawmeals-studio.sanity.studio` |
| Embedded Studio URL | `https://pawmeals-website-editor.vercel.app/studio` |

## Two Studio Surfaces

The project intentionally maintains two Studio access points that both write to the same `production` dataset:

| Surface | Location | Version | Purpose |
|---|---|---|---|
| Hosted Studio | `pawmeals-studio.sanity.studio` | Sanity v4.22.0 (deployed via CLI) | Primary editing interface for the team |
| Embedded Studio | `/studio` route on Vercel | Sanity v4.22.0 (embedded in Next.js) | Fallback access when hosted studio is unavailable |
| Standalone v5 | `studio/` subdirectory | Sanity v5 | Future CLI deploy — not yet deployed |

> [!info] Standalone v5 Studio
> The `studio/` subdirectory contains a Sanity v5 setup with its own `package.json`. To deploy it: `cd studio && npm install && npx sanity deploy` (hostname: `pawmeals-studio`). This has not been deployed yet.

## Required Environment Variables

Set these in Vercel project settings:

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `lr00lxe1` | Public — safe to expose |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Public — safe to expose |
| `SANITY_API_TOKEN` | From sanity.io/manage | **Private** — server-side only. Required for draft previews and write operations. Public reads do NOT need this token. |

> [!warning] Public Read Rule
> The production website reads published Sanity content publicly via `src/lib/sanity/client.ts`. Do **not** attach `SANITY_API_TOKEN` to ordinary published public reads — a stale or invalid private token can break pages that should otherwise render public content. See [[Security and Secrets]].

## Schema Types (9 Total)

| Schema | Type | Route | File |
|---|---|---|---|
| `homepage` | Localized singleton | `/[locale]` | `sanity/schemas/homepage.ts` |
| `aboutPage` | Singleton | `/[locale]/about` | `sanity/schemas/aboutPage.ts` |
| `cateringPage` | Singleton | `/[locale]/catering` | `sanity/schemas/cateringPage.ts` |
| `pawrentingTip` | Collection | Pawrenting surfaces | `sanity/schemas/pawrentingTip.ts` |
| `vetExclusive` | Singleton | `/[locale]/vet` | `sanity/schemas/vetExclusive.ts` |
| `vetArticle` | Collection | Vet editorial | `sanity/schemas/vetArticle.ts` |
| `faq` | Collection | `/[locale]/faqs` | `sanity/schemas/faq.ts` |
| `author` | Collection | Blog + vet articles | `sanity/schemas/author.ts` |
| `blogPost` | Collection | `/[locale]/blog` | `sanity/schemas/blogPost.ts` |

> [!todo] Missing Schema
> A `quizQuestion` / `quizResult` schema for the quiz page (`/[locale]/quiz`) has not been created yet. The quiz route exists but is not Studio-driven. This is a known gap from the schema-to-UAT mapping report.

## Key Source Files

| File | Purpose |
|---|---|
| `src/lib/sanity/client.ts` | Sanity client, all GROQ queries, fetch helpers — hardened with `try/catch` and `isSanityConfigured` guards |
| `sanity.config.ts` | Sanity Studio config for embedded `/studio` route (Sanity v4, Next.js compatible) |
| `sanity.cli.ts` | Sanity CLI config for deploying the main studio — project ID `lr00lxe1`, dataset `production` |
| `studio/sanity.config.ts` | Sanity v5 config for standalone studio deploy |
| `studio/sanity.cli.ts` | Sanity v5 CLI config — hostname `pawmeals-studio` |
| `src/app/studio/[[...tool]]/page.tsx` | Embedded Studio catch-all route — uses dynamic import with `ssr:false` |
| `src/middleware.ts` | next-intl locale routing middleware — excludes `/studio` path |

## CORS Setup

For the hosted Studio to write to the dataset, the Vercel deployment URL must be added to the Sanity project's CORS origins:

1. Go to [sanity.io/manage](https://sanity.io/manage) → project `lr00lxe1`
2. Navigate to **API** → **CORS Origins**
3. Add `https://pawmeals-website-editor.vercel.app` with **Allow credentials** enabled

## Deploy Standalone Studio (Future)

```bash
cd /home/ubuntu/pawmeals-nextjs/studio
npm install
npx sanity deploy
# When prompted for hostname: pawmeals-studio
```
