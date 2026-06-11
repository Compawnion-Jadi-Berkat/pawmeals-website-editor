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

The localized layout fetches `siteSettings` and passes it to navigation, footer, and organization structured data. This keeps menu links, contact details, social URLs, and organization data centralized in Studio while allowing a narrow structural guardrail for global chrome when published `siteSettings` navigation is absent or contains legacy route aliases.

| Concern | File |
|---|---|
| Layout fetch | `src/app/[locale]/layout.tsx` |
| Navbar | `src/components/layout/Navbar.tsx` |
| Footer | `src/components/layout/Footer.tsx` |
| Organization schema | `src/components/seo/OrganizationSchema.tsx` |
| Schema | `sanity/schemas/siteSettings.ts` |
| Route normalization and menu ordering | `src/lib/navigation.ts` |
| Brand theme tokens | `src/app/globals.css`, `tailwind.config.ts` |

## Current Guardrails

`Navbar` and `Footer` should continue to prefer `siteSettings` data. If that data is missing, the fallback links are structural navigation only, not business content. The shared helper in `src/lib/navigation.ts` also normalizes legacy public hrefs and enforces the visible order **Katering → Quiz → Tentang Kami → Vet Exclusive** for the primary Indonesian navigation.

The current brand refresh maps the Pawmeals external palette into frontend theme tokens while preserving the existing luxury glass, lens, and gradient treatment. Future visual updates should adjust theme tokens first, then inspect page-level gradients such as `HeroCarousel` only when a component has hardcoded decorative color stops.
