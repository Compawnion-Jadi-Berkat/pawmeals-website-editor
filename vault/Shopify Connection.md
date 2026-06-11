---
type: integration-note
status: active
owner: Eddie Amintohir
project: Pawmeals Website Editor
subsystem: shopify
tags: [shopify, ecommerce, storefront-api, env-vars]
updated: 2026-06-12
---
# Shopify Connection

This note documents the Shopify Storefront API integration — how it is configured, what environment variables are required, and what has changed.

## Store Configuration

| Setting | Value |
|---|---|
| Store domain | `pawmeals-headless.pawmeals.co` (custom domain) |
| Storefront API version | `2025-01` (updated from deprecated `2024-01`) |
| Storefront access token | Set via `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` env var |
| GraphQL endpoint | `https://pawmeals-headless.pawmeals.co/api/2025-01/graphql.json` |

> [!important] Custom Domain — Not myshopify.com
> The store uses a custom domain (`pawmeals-headless.pawmeals.co`), not the default `*.myshopify.com`. The `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` env var must be set to the custom domain value in Vercel.

## Required Environment Variables

Set these in the Vercel project settings under **Environment Variables**:

| Variable | Value | Where to Find |
|---|---|---|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | `pawmeals-headless.pawmeals.co` | Shopify Admin → Domains |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` | `947a4c07c6057f7f05c02fa82bd1719a` | Shopify Admin → Apps → Headless → Storefront API |

## Key Source Files

| File | Purpose |
|---|---|
| `src/lib/shopify/client.ts` | Shopify Storefront API client — reads env vars, sets API version to `2025-01` |
| `next.config.mjs` | Image `remotePatterns` — includes `*.pawmeals.co` for product images from custom domain |

## What Changed in This Session

| Commit | Change |
|---|---|
| `a8d0ef4` | Updated Shopify Storefront API version from deprecated `2024-01` to `2025-01` |
| `340a9a6` | Added `*.pawmeals.co` to `next.config.mjs` image `remotePatterns` — required for Next.js Image optimizer to serve product photos from the custom Shopify domain |

## Image Remote Patterns

The `next.config.mjs` now includes the following `remotePatterns` for Shopify images:

```js
{ protocol: 'https', hostname: '*.pawmeals.co' },
{ protocol: 'https', hostname: 'cdn.shopify.com' },
```

This covers both the custom domain and the Shopify CDN fallback.

## Connection Status

| Check | Status |
|---|---|
| API version current | ✅ `2025-01` |
| Custom domain configured in code | ✅ via env var |
| Image remotePatterns updated | ✅ commit `340a9a6` |
| Vercel env var updated | ⚠️ **Action required** — must be set in Vercel dashboard |

> [!todo] Action Required
> Update `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` to `pawmeals-headless.pawmeals.co` in the Vercel project environment variables, then trigger a redeploy.
