---
type: page-map
status: active
owner: Eddie Amintohir
project: Pawmeals Website Editor
tags: [routes, components, sanity, editing]
updated: 2026-05-22
---

# Page Editing Map

This map tells future editors where to begin for each visible page. Always inspect the route file first, then the query helper, then the component. If the content is supposed to be editor-managed, update the schema and query before touching presentation copy.

| Public Route | Route File | Sanity Source | Key Components |
|---|---|---|---|
| `/[locale]` | `src/app/[locale]/page.tsx` | `homepage`, `product`, `siteSettings` indirectly through layout | `HeroCarousel`, `WhyPawmeals`, `FeaturedProducts`, `Testimonials`, `VetEndorsement`, `QuizCTA`, `InstagramFeed`, `NewsletterSignup` |
| `/[locale]/products` | `src/app/[locale]/products/page.tsx` | `product`, `productCategory` | `ProductFilters`, `ProductsGrid` |
| `/[locale]/products/[handle]` | `src/app/[locale]/products/[handle]/page.tsx` | `product` | `ProductDetail`, product structured data |
| `/[locale]/faqs` | `src/app/[locale]/faqs/page.tsx` | `faq` | `FAQAccordion` |
| `/[locale]/catering` | `src/app/[locale]/catering/page.tsx` | `cateringPage` | Route-level sections |
| `/[locale]/about` | `src/app/[locale]/about/page.tsx` | `aboutPage` | Route-level sections |
| `/[locale]/vet` | `src/app/[locale]/vet/page.tsx` | `vetExclusivePage` | Route-level sections |
| `/[locale]/subscribe` | `src/app/[locale]/subscribe/page.tsx` | `subscriptionPage` | Route-level sections |
| `/[locale]/blog` | `src/app/[locale]/blog/page.tsx` | `blogPost`, `author` | Route-level listing cards |
| Global layout | `src/app/[locale]/layout.tsx` | `siteSettings` | `Navbar`, `Footer`, `OrganizationSchema` |

## Editing Example

If the homepage hero needs a new CTA, do not edit `HeroCarousel.tsx` first. Start with the `homepage` document in Studio. If the needed field does not exist, add it in `sanity/schemas/homepage.ts`, select it in `HOMEPAGE_QUERY`, and then render it in `HeroCarousel.tsx`.

## Common Mistake to Avoid

Do not patch missing content by adding local arrays such as `const fallbackProducts = [...]`, placeholder images, or hardcoded navigation labels. Those changes can make the website look fixed while breaking the Studio source-of-truth requirement.
