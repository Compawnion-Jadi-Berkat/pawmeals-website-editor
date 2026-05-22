---
type: schema-note
status: active
owner: Eddie Amintohir
schema: homepage
cardinality: Localized singleton
source_file: sanity/schemas/homepage.ts
frontend_consumers: src/app/[locale]/page.tsx and src/components/home/*
tags: [schema, sanity, pawmeals]
updated: 2026-05-22
---

# homepage Schema

The `homepage` schema is part of the Pawmeals Studio source-of-truth model. Its current purpose is: **Homepage sections including hero slides, feature cards, testimonials, vet partners, quiz CTA, Instagram feed, and newsletter form copy.**

| Field | Value |
|---|---|
| Schema name | `homepage` |
| Cardinality | Localized singleton |
| Source file | `sanity/schemas/homepage.ts` |
| Frontend consumers | src/app/[locale]/page.tsx and src/components/home/* |
| Related map | [[Sanity Studio Source of Truth]] |

## Future Edit Guidance

When a visible website change needs new editable content, update this schema first, then update the GROQ selection in `src/lib/sanity/client.ts`, then pass the field into the route/component that renders it. Avoid adding hardcoded frontend copy unless it is technical UI chrome that should not be editor-managed.
