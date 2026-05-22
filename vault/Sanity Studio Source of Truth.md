---
type: sanity-map
status: active
owner: Eddie Amintohir
project: Pawmeals Website Editor
subsystem: cms
tags: [sanity, cms, content-model, source-of-truth]
updated: 2026-05-22
---

# Sanity Studio Source of Truth

Sanity Studio is the source of truth for major visible website content. Future edits should start by confirming whether a visible section is controlled by a Studio schema, a GROQ query in `src/lib/sanity/client.ts`, and a route/component pair.

| Studio Document Type | Cardinality | Main Frontend Consumer | Notes |
|---|---:|---|---|
| `siteSettings` | Singleton | `src/app/[locale]/layout.tsx`, `Navbar`, `Footer`, `OrganizationSchema` | Controls brand, navigation, footer links, social links, logo, contact, and structured data. |
| `homepage` | Localized singleton | `src/app/[locale]/page.tsx`, homepage components | Controls hero slides, why cards, testimonials, vet partners, quiz CTA, Instagram feed, and newsletter copy. |
| `product` | Collection | Products listing, detail, homepage featured products | Controls product cards, product detail copy, pricing tiers, ingredients, feeding guide, badges, and images. |
| `productCategory` | Collection | `ProductFilters`, product cards, category taxonomy | Controls product filters and category labels/icons/order. |
| `faq` | Collection | `/[locale]/faqs` | Controls FAQ questions and answers. |
| `cateringPage` | Singleton | `/[locale]/catering` | Controls catering hero, services, gallery, testimonials, CTA, and WhatsApp. |
| `aboutPage` | Singleton | `/[locale]/about` | Controls story, mission, vision, proof points, values, team, milestones, and certifications. |
| `vetExclusivePage` | Singleton | `/[locale]/vet` | Controls vet page hero, benefits/statistics/testimonials/clinics/Q&A depending on schema fields. |
| `subscriptionPage` | Localized singleton | `/[locale]/subscribe` | Controls subscription hero, perks, steps, frequencies, and final CTA. |
| `blogPost` | Collection | `/[locale]/blog` and blog detail routes | Controls editorial listing and post content. |
| `author` | Collection | Blog and vet article author references | Controls author metadata and credentials. |
| `pawrentingTip` | Collection | Pawrenting content surfaces | Controls tip content where implemented. |
| `vetArticle` | Collection | Vet editorial content | Controls vet article cards where implemented. |
| `quizQuestion` | Collection | Quiz flow | Controls questionnaire content if wired in the current quiz implementation. |
| `quizResult` | Collection | Quiz flow result mapping | Controls result copy and product matching if wired in the current quiz implementation. |

## Query and Helper Pattern

The website generally follows this pattern: schema fields are defined in `sanity/schemas/*.ts`, selected by a GROQ constant in `src/lib/sanity/client.ts`, read through an exported helper such as `getHomepageContent`, then passed by a route component into UI components. The helper `fetchWithCanonicalFallback` is used for the most important public content paths so the production site survives stale Vercel Sanity environment settings.

| Helper | Expected Return | Important Guard |
|---|---|---|
| `getHomepageContent(locale)` | Homepage singleton or `null` | Must be usable when at least one homepage section exists. |
| `getSiteSettings()` | Site settings singleton or `null` | Navigation and footer should not rely on local hardcoded arrays. |
| `getProductCategories()` | Category array | Empty category list should not resurrect hardcoded filters. |
| `getSanityProducts(locale)` | Product array mapped to `WebsiteProduct` | Product cards should render only Studio products. |
| `getFeaturedSanityProducts(locale)` | Featured product array | Homepage featured products should render only Studio products. |
| `getSanityProductByHandle(handle, locale)` | One mapped product or `null` | Detail page should 404 or empty-state rather than use fake product data. |

> **Studio ownership rule:** if a user says “make everything connected to Studio,” the fix should connect schemas, queries, and components. It should not add static fallback catalogues, fake testimonials, or placeholder product images.
