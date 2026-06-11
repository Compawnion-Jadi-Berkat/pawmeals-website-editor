---
type: schema-note
status: active
owner: Eddie Amintohir
schema: cateringPage
cardinality: Singleton
source_file: sanity/schemas/cateringPage.ts
frontend_consumers: src/app/[locale]/catering/page.tsx
tags: [schema, sanity, pawmeals]
updated: 2026-05-22
---

# cateringPage Schema

The `cateringPage` schema is part of the Pawmeals Studio source-of-truth model. Its current purpose is: **Catering hero, service packages, gallery, testimonials, contact/WhatsApp CTA, and supporting content.**

| Field | Value |
|---|---|
| Schema name | `cateringPage` |
| Cardinality | Singleton |
| Source file | `sanity/schemas/cateringPage.ts` |
| Frontend consumers | src/app/[locale]/catering/page.tsx |
| Related map | [[Sanity Studio Source of Truth]] |

## Future Edit Guidance

When a visible website change needs new editable content, update this schema first, then update the GROQ selection in `src/lib/sanity/client.ts`, then pass the field into the route/component that renders it. Avoid adding hardcoded frontend copy unless it is technical UI chrome that should not be editor-managed.
