---
type: schema-note
status: active
owner: Eddie Amintohir
schema: vetExclusivePage
cardinality: Singleton
source_file: sanity/schemas/vetExclusive.ts
frontend_consumers: src/app/[locale]/vet/page.tsx
tags: [schema, sanity, pawmeals]
updated: 2026-05-22
---

# vetExclusivePage Schema

The `vetExclusivePage` schema is part of the Pawmeals Studio source-of-truth model. Its current purpose is: **Veterinary program hero, benefits, clinic/testimonial content, statistics, and Q&A sections.**

| Field | Value |
|---|---|
| Schema name | `vetExclusivePage` |
| Cardinality | Singleton |
| Source file | `sanity/schemas/vetExclusive.ts` |
| Frontend consumers | src/app/[locale]/vet/page.tsx |
| Related map | [[Sanity Studio Source of Truth]] |

## Future Edit Guidance

When a visible website change needs new editable content, update this schema first, then update the GROQ selection in `src/lib/sanity/client.ts`, then pass the field into the route/component that renders it. Avoid adding hardcoded frontend copy unless it is technical UI chrome that should not be editor-managed.
