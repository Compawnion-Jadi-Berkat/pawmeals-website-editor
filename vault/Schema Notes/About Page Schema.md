---
type: schema-note
status: active
owner: Eddie Amintohir
schema: aboutPage
cardinality: Singleton
source_file: sanity/schemas/aboutPage.ts
frontend_consumers: src/app/[locale]/about/page.tsx
tags: [schema, sanity, pawmeals]
updated: 2026-05-22
---

# aboutPage Schema

The `aboutPage` schema is part of the Pawmeals Studio source-of-truth model. Its current purpose is: **Brand story, mission, vision, values, proof points, team, milestones, certifications, and page CTAs.**

| Field | Value |
|---|---|
| Schema name | `aboutPage` |
| Cardinality | Singleton |
| Source file | `sanity/schemas/aboutPage.ts` |
| Frontend consumers | src/app/[locale]/about/page.tsx |
| Related map | [[Sanity Studio Source of Truth]] |

## Future Edit Guidance

When a visible website change needs new editable content, update this schema first, then update the GROQ selection in `src/lib/sanity/client.ts`, then pass the field into the route/component that renders it. Avoid adding hardcoded frontend copy unless it is technical UI chrome that should not be editor-managed.
