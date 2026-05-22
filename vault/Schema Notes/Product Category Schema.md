---
type: schema-note
status: active
owner: Eddie Amintohir
schema: productCategory
cardinality: Collection
source_file: sanity/schemas/productCategory.ts
frontend_consumers: src/components/products/ProductFilters.tsx and product cards
tags: [schema, sanity, pawmeals]
updated: 2026-05-22
---

# productCategory Schema

The `productCategory` schema is part of the Pawmeals Studio source-of-truth model. Its current purpose is: **Studio-managed taxonomy for catalogue filters and product category labels/icons/order.**

| Field | Value |
|---|---|
| Schema name | `productCategory` |
| Cardinality | Collection |
| Source file | `sanity/schemas/productCategory.ts` |
| Frontend consumers | src/components/products/ProductFilters.tsx and product cards |
| Related map | [[Sanity Studio Source of Truth]] |

## Future Edit Guidance

When a visible website change needs new editable content, update this schema first, then update the GROQ selection in `src/lib/sanity/client.ts`, then pass the field into the route/component that renders it. Avoid adding hardcoded frontend copy unless it is technical UI chrome that should not be editor-managed.
