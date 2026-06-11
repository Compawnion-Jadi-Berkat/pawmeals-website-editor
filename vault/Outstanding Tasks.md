---
type: task-tracker
status: active
owner: Eddie Amintohir
project: Pawmeals Website Editor
tags: [tasks, backlog, deferred, todo]
updated: 2026-06-12
---
# Outstanding Tasks

This note tracks all known pending work — deferred upgrades, missing features, and required owner actions. Update this note whenever a task is completed or a new one is identified.

## Owner Actions Required (Vercel / External)

These cannot be completed by an AI agent — they require direct access to external dashboards:

- [ ] **Update `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`** in Vercel environment variables to `pawmeals-headless.pawmeals.co`, then trigger a redeploy.
- [ ] **Add `SANITY_API_TOKEN`** to Vercel environment variables (from sanity.io/manage → project `lr00lxe1` → API → Tokens). Required for draft previews and write operations.
- [ ] **Add Vercel URL to Sanity CORS origins** — go to sanity.io/manage → project `lr00lxe1` → API → CORS Origins → add `https://pawmeals-website-editor.vercel.app` with credentials enabled.
- [ ] **Deploy standalone Sanity v5 Studio** — `cd studio && npm install && npx sanity deploy` (hostname: `pawmeals-studio`). This upgrades the hosted Studio from v4 to v5.

## Missing Sanity Schema

- [ ] **Create `quizQuestion` and `quizResult` schemas** for the quiz page (`/[locale]/quiz`). The route exists but is not Studio-driven. Requires: question text, answer options, product recommendation mapping, result copy. See [[Sanity Content Model]] for existing schema patterns.

## Deferred Dependency Upgrades

These are tracked in detail in [[Dependency Status]]:

- [ ] **Tailwind CSS v4 upgrade** — run `npx @tailwindcss/upgrade`, review ~200 utility class changes, test all routes. Dedicate a full session.
- [ ] **Next.js v16 upgrade** — blocked by `/_global-error` prerender regression with `useContext` providers. Retry at v16.3.x or later.
- [ ] **Framer Motion v12 upgrade** — audit animation usage in components first (`AnimatePresence`, `motion` variants have breaking changes).
- [ ] **TypeScript v6 upgrade** — after all features are stable; strict mode changes may surface new type errors.
- [ ] **Stripe v22 upgrade** — only when Stripe payment integration is actively built.

## Feature Backlog

- [ ] **Stripe payment integration** — not yet started. When building, use Stripe v22 and add `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to Vercel env vars.
- [ ] **Quiz page Studio connection** — wire the quiz route to Sanity `quizQuestion` / `quizResult` documents once schemas are created.
- [ ] **Subscription page** — `subscriptionPage` Sanity schema exists; verify the frontend route is fully wired to Studio content.
- [ ] **Blog detail route** — `blogPost` schema exists; confirm individual post pages render Studio content correctly.
- [ ] **Vet article detail route** — `vetArticle` schema exists; confirm detail pages are implemented.
- [ ] **i18n content parity** — all Studio documents should have both `id` (Indonesian) and `en` (English) content. Verify all localized singletons have both locale variants published.

## Completed This Session (June 2026)

- [x] Shopify Storefront API version updated from `2024-01` to `2025-01` (commit `a8d0ef4`)
- [x] `*.pawmeals.co` added to Next.js image `remotePatterns` for custom Shopify domain (commit `340a9a6`)
- [x] Zod upgraded to v4.4.3 (commit `c24ff57`)
- [x] Lucide React upgraded to v1.17.0 — Instagram icon replaced with Camera (commit `c24ff57`)
- [x] Vitest upgraded to v4.1.8 (commit `c24ff57`)
- [x] `@tailwindcss/typography` added (commit `c24ff57`)
- [x] Next.js patched to 15.5.19 (commit `c24ff57`)
- [x] Next.js v16 upgrade attempted and reverted (commit `c24ff57`)
- [x] Full code review completed — TypeScript `any` types fixed, Sanity fetch helpers hardened, security headers added
- [x] 72 packages updated in dependency audit

## Reference Notes

- [[Dependency Status]] — full version table and deferred upgrade details
- [[Shopify Connection]] — Shopify env vars and domain configuration
- [[Sanity CMS Setup]] — Sanity project details, schemas, and studio surfaces
- [[Sanity Studio Source of Truth]] — schema-to-route mapping and query patterns
- [[Security and Secrets]] — token and credential handling rules
