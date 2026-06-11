---
type: schema-note
status: active
owner: Eddie Amintohir
schema: siteSettings
cardinality: Singleton
source_file: sanity/schemas/siteSettings.ts
frontend_consumers: src/app/[locale]/layout.tsx, src/components/layout/Navbar.tsx, src/components/layout/Footer.tsx, src/components/seo/OrganizationSchema.tsx
tags: [schema, sanity, pawmeals]
updated: 2026-05-22
---

# siteSettings Schema

The `siteSettings` schema is part of the Pawmeals Studio source-of-truth model. Its current purpose is: **Global brand, navigation, footer, contact, social links, and organization structured-data source.**

| Field | Value |
|---|---|
| Schema name | `siteSettings` |
| Cardinality | Singleton |
| Source file | `sanity/schemas/siteSettings.ts` |
| Frontend consumers | src/app/[locale]/layout.tsx, src/components/layout/Navbar.tsx, src/components/layout/Footer.tsx, src/components/seo/OrganizationSchema.tsx |
| Related map | [[Sanity Studio Source of Truth]] |

## Future Edit Guidance

When a visible website change needs new editable content, update this schema first, then update the GROQ selection in `src/lib/sanity/client.ts`, then pass the field into the route/component that renders it. Avoid adding hardcoded frontend copy unless it is technical UI chrome that should not be editor-managed.
