---
type: schema-note
status: active
owner: Eddie Amintohir
schema: blogPost
cardinality: Collection
source_file: sanity/schemas/blogPost.ts
frontend_consumers: src/app/[locale]/blog/page.tsx and blog detail routes when present
tags: [schema, sanity, pawmeals]
updated: 2026-05-22
---

# blogPost Schema

The `blogPost` schema is part of the Pawmeals Studio source-of-truth model. Its current purpose is: **Editorial posts and listing-card data for the blog surface.**

| Field | Value |
|---|---|
| Schema name | `blogPost` |
| Cardinality | Collection |
| Source file | `sanity/schemas/blogPost.ts` |
| Frontend consumers | src/app/[locale]/blog/page.tsx and blog detail routes when present |
| Related map | [[Sanity Studio Source of Truth]] |

## Future Edit Guidance

When a visible website change needs new editable content, update this schema first, then update the GROQ selection in `src/lib/sanity/client.ts`, then pass the field into the route/component that renders it. Avoid adding hardcoded frontend copy unless it is technical UI chrome that should not be editor-managed.
