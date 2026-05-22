---
type: architecture
status: active
owner: Eddie Amintohir
project: Pawmeals Website Editor
subsystem: frontend
tags: [architecture, nextjs, sanity, vercel]
updated: 2026-05-22
---

# Architecture Overview

The Pawmeals repository is a Next.js website with an embedded Sanity Studio route and a separate standalone Studio workspace. Public pages are localized under `src/app/[locale]`, shared UI components live under `src/components`, and Sanity queries/helpers live in `src/lib/sanity/client.ts`.

| Layer | Current Location | Role |
|---|---|---|
| Public website | `src/app/[locale]` | Route-level server components for localized pages such as `/en`, `/en/products`, `/en/about`, and `/en/vet`. |
| UI components | `src/components` | Homepage, layout, product, SEO, cart, FAQ, and quiz components. |
| Sanity data access | `src/lib/sanity/client.ts` | GROQ queries, public read clients, canonical fallback behavior, and content mapping. |
| Studio schemas | `sanity/schemas` | Root schema registry used by embedded Studio and website query contracts. |
| Embedded Studio | `src/app/studio/[...tool]/page.tsx` | Next.js route for `/studio`; uses the root Sanity configuration. |
| Standalone Studio | `studio/` | Separate Sanity Studio deployment path for the hosted Studio surface. |
| Handover vault | `vault/` | Obsidian-compatible operating manual for future AI and human editors. |

## Important Current Design Decision

The visible marketing, catalogue, navigation, footer, and structured organization content should be managed from Sanity Studio. The site was previously hardened so public reads use published content without attaching a private token, then fall back to the canonical project and dataset if Vercel environment values are wrong.

| Canonical Value | Meaning |
|---|---|
| Sanity project ID | `lr00lxe1` |
| Sanity dataset | `production` |
| Website production host | `pawmeals-website-editor.vercel.app` |
| GitHub branch | `main` |

## Critical Source Files

| File | Why It Matters |
|---|---|
| `src/lib/sanity/client.ts` | First file to inspect for missing content, empty page behavior, public Sanity reads, canonical fallback, and query shape. |
| `sanity/schemas/index.ts` | Lists every Studio document type currently registered. |
| `sanity/schemas/homepage.ts` | Defines homepage sections used by `/[locale]`. |
| `sanity/schemas/siteSettings.ts` | Defines navigation, footer, contact, logo, and global organization data. |
| `src/app/[locale]/layout.tsx` | Fetches site settings for navbar, footer, and global structured data. |
| `src/app/[locale]/page.tsx` | Homepage route that composes Studio-driven sections. |

## Historical Notes

Some older repository documents still mention Shopify as an active product content source. Treat those documents as historical unless current code confirms Shopify is still used for the path being changed. The latest Studio migration moved major visible product and category display paths to Sanity-managed product records.
