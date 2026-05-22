---
type: page-note
status: active
owner: Eddie Amintohir
route: global-layout
sanity_documents: [siteSettings]
components: [Navbar, Footer, OrganizationSchema]
priority: critical
tags: [layout, navigation, footer, seo, sanity]
updated: 2026-05-22
---

# Global Layout

The localized layout fetches `siteSettings` and passes it to navigation, footer, and organization structured data. This prevents menu links, contact details, social URLs, and brand data from being scattered as hardcoded constants.

| Concern | File |
|---|---|
| Layout fetch | `src/app/[locale]/layout.tsx` |
| Navbar | `src/components/layout/Navbar.tsx` |
| Footer | `src/components/layout/Footer.tsx` |
| Organization schema | `src/components/seo/OrganizationSchema.tsx` |
| Schema | `sanity/schemas/siteSettings.ts` |
