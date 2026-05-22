---
type: repository-map
status: active
owner: Eddie Amintohir
project: Pawmeals Website Editor
tags: [repository, file-map]
updated: 2026-05-22
---

# Repository Map

This repository contains the public Pawmeals website, Sanity schema definitions, documentation, backend-related folders, and this vault.

| Path | Purpose | Start Here When |
|---|---|---|
| `src/app/[locale]` | Localized public routes. | A page route is broken or needs layout/content changes. |
| `src/components/home` | Homepage section components. | Homepage sections render incorrectly or need new Studio fields. |
| `src/components/layout` | Navbar and footer. | Navigation, logo, footer, or global links need changes. |
| `src/components/products` | Product listing, filters, grid, and detail UI. | Catalogue or product page needs changes. |
| `src/components/seo` | Structured data components. | Organization or product SEO schema needs changes. |
| `src/lib/sanity` | Sanity clients, GROQ queries, and data mapping. | Content is missing, stale, or shaped incorrectly. |
| `sanity/schemas` | Studio document schemas. | Editors need a new field or document type. |
| `studio/` | Standalone Sanity Studio workspace. | Hosted Studio deployment or dependency split needs work. |
| `docs/` | Older project audits and handoff documents. | You need historical context, but verify against current code. |
| `vault/` | Obsidian AI handover vault. | You need current operational context and future-agent entry points. |

## Historical Documentation Warning

Older files such as `DEPLOYMENT_GUIDE.md` and some schema handoff documents may still describe legacy Shopify-centric assumptions. Use those documents for history, not as definitive current architecture, unless current source code confirms the same behavior.
