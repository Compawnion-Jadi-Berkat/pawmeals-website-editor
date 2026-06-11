---
type: dependency-status
status: active
owner: Eddie Amintohir
project: Pawmeals Website Editor
tags: [dependencies, upgrades, versions, deferred]
updated: 2026-06-12
---
# Dependency Status

This note tracks the current state of all major dependencies — what was upgraded, what was deferred, and why. Update this note after any `npm install`, `npm update`, or version-change session.

## Current Package Version

`package.json` version: **1.7.1**

## Core Framework

| Package | Current Version | Status | Notes |
|---|---|---|---|
| `next` | `^15.5.19` | Stable | v16 upgrade attempted and **reverted** — see deferred section. |
| `react` | `^19.2.7` | Stable | No issues. |
| `typescript` | `^5.5.4` | Stable | v6 upgrade deferred — strict mode audit needed first. |
| `tailwindcss` | `^3.4.19` | Stable | v4 upgrade deferred — requires full CSS migration (~200 utility changes). |

## Sanity CMS

| Package | Current Version | Status | Notes |
|---|---|---|---|
| `sanity` (embedded) | `^4.22.0` | Stable | Used for embedded `/studio` route on Vercel. |
| `sanity` (standalone) | `^5.x` in `studio/` | Stable | Standalone Sanity v5 in `studio/` subdirectory for CLI deploy. |
| `@sanity/vision` | Bundled with v4 | Stable | Available in embedded studio. |

## E-commerce / Shopify

| Package | Current Version | Status | Notes |
|---|---|---|---|
| Shopify Storefront API | `2025-01` | Current | Updated from deprecated `2024-01` in commit `a8d0ef4`. |
| Store domain | `pawmeals-headless.pawmeals.co` | Active | Custom domain set in `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`. `*.pawmeals.co` added to `next.config.mjs` image remotePatterns in commit `340a9a6`. |

## Key Libraries — Upgraded This Session

| Package | Previous | Current | Commit | Notes |
|---|---|---|---|---|
| `zod` | `^3.x` | `^4.4.3` | `c24ff57` | Phase B safe upgrade. |
| `lucide-react` | `^0.x` | `^1.17.0` | `c24ff57` | Instagram icon removed in v1 — replaced with `Camera` icon. |
| `vitest` | `^2.x` | `^4.1.8` | `c24ff57` | Phase B safe upgrade. |
| `@tailwindcss/typography` | not installed | added | `c24ff57` | Added for blog/vet article prose rendering. |
| `next` (security patch) | `15.x` | `15.5.19` | `c24ff57` | Patched for known CVE. |

## Key Libraries — Deferred Upgrades

| Package | Target Version | Reason Deferred | Retry Condition |
|---|---|---|---|
| `next` | v16 | Known regression: `/_global-error` prerender + `useContext` providers breaks build. | Retry at v16.3.x or when regression is fixed upstream. |
| `tailwindcss` | v4 | Requires running `npx @tailwindcss/upgrade` — ~200 utility class changes across the codebase. | Dedicate a full session; run upgrade tool, review all changes, test all routes. |
| `framer-motion` | v12 | Animation API audit needed — v12 has breaking changes to `AnimatePresence` and `motion` variants. | Audit animation usage in components before upgrading. |
| `typescript` | v6 | Strict mode changes may surface new type errors. | Upgrade after all features are stable and test coverage is solid. |
| `stripe` | v22 | Only relevant when Stripe payment integration is actively built. | Upgrade when starting Stripe integration work. |

## Node.js Requirement

- **Current requirement:** Node 18+ (Next.js 15)
- **Future requirement:** Node 20+ (Next.js 16, when upgraded)

> [!warning] Next.js v16 Upgrade Blocked
> The v16 upgrade was attempted and reverted in commit `c24ff57`. The blocker is a known upstream regression where `/_global-error` prerender fails when `useContext` providers are present in the root layout. Do not retry until v16.3.x or later.

## Useful Commands

```bash
# Check outdated packages
npm outdated

# Run type check before any upgrade
npm run type-check

# Run build validation
npm run build

# Check for security vulnerabilities
npm audit
```
