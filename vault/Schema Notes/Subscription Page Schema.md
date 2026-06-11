---
type: schema-note
status: active
owner: Eddie Amintohir
schema: subscriptionPage
cardinality: Localized singleton
source_file: sanity/schemas/subscriptionPage.ts
frontend_consumers: src/app/[locale]/subscribe/page.tsx
tags: [schema, sanity, pawmeals]
updated: 2026-05-22
---

# subscriptionPage Schema

The `subscriptionPage` schema is part of the Pawmeals Studio source-of-truth model. Its current purpose is: **Subscription-page hero, plan explanation, frequencies, perks, process steps, and CTA copy.**

| Field | Value |
|---|---|
| Schema name | `subscriptionPage` |
| Cardinality | Localized singleton |
| Source file | `sanity/schemas/subscriptionPage.ts` |
| Frontend consumers | src/app/[locale]/subscribe/page.tsx |
| Related map | [[Sanity Studio Source of Truth]] |

## Future Edit Guidance

When a visible website change needs new editable content, update this schema first, then update the GROQ selection in `src/lib/sanity/client.ts`, then pass the field into the route/component that renders it. Avoid adding hardcoded frontend copy unless it is technical UI chrome that should not be editor-managed.
