---
type: page-note
status: active
owner: Eddie Amintohir
route: /[locale]
sanity_documents: [homepage, product, siteSettings]
components: [HeroCarousel, WhyPawmeals, FeaturedProducts, Testimonials, VetEndorsement, QuizCTA, InstagramFeed, NewsletterSignup]
priority: critical
tags: [page, homepage, sanity]
updated: 2026-05-22
---

# Homepage

The homepage is the most important Studio-driven page. It composes content from the localized `homepage` singleton and featured `product` records. Global navigation and footer come from `siteSettings` through the localized layout.

| Concern | File |
|---|---|
| Route composition | `src/app/[locale]/page.tsx` |
| Homepage query | `HOMEPAGE_QUERY` in `src/lib/sanity/client.ts` |
| Product query | `FEATURED_SANITY_PRODUCTS_QUERY` in `src/lib/sanity/client.ts` |
| Schema | `sanity/schemas/homepage.ts` |

If the homepage is blank, begin with [[Debugging - Blank or Empty Production Page]].
