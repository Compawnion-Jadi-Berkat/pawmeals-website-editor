---
type: schema-note
status: active
owner: Eddie Amintohir
schema: faq
cardinality: Collection
source_file: sanity/schemas/faq.ts
frontend_consumers: src/app/[locale]/faqs/page.tsx
tags: [schema, sanity, pawmeals]
updated: 2026-05-22
---

# faq Schema

The `faq` schema is part of the Pawmeals Studio source-of-truth model. Its current purpose is: **FAQ questions and answers for the public FAQ page.**

| Field | Value |
|---|---|
| Schema name | `faq` |
| Cardinality | Collection |
| Source file | `sanity/schemas/faq.ts` |
| Frontend consumers | src/app/[locale]/faqs/page.tsx |
| Related map | [[Sanity Studio Source of Truth]] |

## Future Edit Guidance

When a visible website change needs new editable content, update this schema first, then update the GROQ selection in `src/lib/sanity/client.ts`, then pass the field into the route/component that renders it. Avoid adding hardcoded frontend copy unless it is technical UI chrome that should not be editor-managed.
