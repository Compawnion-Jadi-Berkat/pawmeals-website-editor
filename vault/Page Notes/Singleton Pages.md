---
type: page-note
status: active
owner: Eddie Amintohir
route: singleton-pages
sanity_documents: [aboutPage, cateringPage, vetExclusivePage, subscriptionPage]
priority: high
tags: [page, singleton, sanity]
updated: 2026-05-22
---

# Singleton Pages

These pages should be edited through singleton Studio documents rather than inline route arrays. When adding a new visible section, add the field to the relevant schema, select it in the query, and render it in the route.

| Route | Sanity Document | Route File |
|---|---|---|
| `/[locale]/about` | `aboutPage` | `src/app/[locale]/about/page.tsx` |
| `/[locale]/catering` | `cateringPage` | `src/app/[locale]/catering/page.tsx` |
| `/[locale]/vet` | `vetExclusivePage` | `src/app/[locale]/vet/page.tsx` |
| `/[locale]/subscribe` | `subscriptionPage` | `src/app/[locale]/subscribe/page.tsx` |
