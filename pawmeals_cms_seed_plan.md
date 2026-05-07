# Pawmeals Sanity CMS Seed Plan

This plan translates the UI/UX direction into concrete Sanity records. The content is intentionally schema-valid and CMS-first: it should be inserted through Sanity documents and assets, not hard-coded into React components.

## Priority Logic

The homepage should be seeded first because it is already wired to Sanity and will immediately show visual changes. About, Catering, Vet Exclusive, and editorial content should also be seeded because matching schemas and queries exist, but their current routes need frontend wiring before those records fully replace hard-coded page content.

| Priority | Document Type | Records | Why It Matters |
|---:|---|---:|---|
| 1 | `homepage` | 1 singleton | Immediately affects hero, feature cards, testimonials, and vet quotes. |
| 2 | `author` | 4 authors | Supports blog, pawrenting tips, vet articles, and vet Q&A references. |
| 3 | `aboutPage` | 1 singleton | Provides brand story, mission, proof points, team, milestones, and certification visuals. |
| 4 | `cateringPage` | 1 singleton | Provides package cards, process steps, gallery, and catering testimonials. |
| 5 | `vetExclusivePage` | 1 singleton | Provides vet credibility, partner clinics, and Q&A records. |
| 6 | `pawrentingTip`, `blogPost`, `vetArticle`, `faq` | 15–20 records total | Fills listing pages and supports a complete website preview once pages are wired. |

## Homepage Content Shape

| Field | Proposed Content Direction |
|---|---|
| `heroSlides` | Three slides: fresh-cooked daily meals, vet-informed nutrition, and easy chilled delivery/subscription. |
| `whyPawmeals` | Six cards using supported icon names: `leaf`, `shield`, `heart`, `truck`, `award`, and `flame`. |
| `featuredTestimonials` | Five pet-parent stories with pet names, breed/species, rating, review, and uploaded pet/lifestyle photo. |
| `vetPartners` | Three vet partner quotes. Note: the current homepage component expects `name`/`clinic`, while the query returns `vetName`/`clinicName`; this needs a transform or component prop fix for perfect display. |

## Page Singleton Content Shape

| Document | Key Visual Content |
|---|---|
| `aboutPage` | Warm founder-style story, Pawmiracle transformation story, natural ingredient image, three to four team profiles, proof points, milestones, and certification-style badges/logos. |
| `cateringPage` | Hero image of prepared meal bowls, three service packages, three how-it-works steps, gallery images, and two customer/organization testimonials. |
| `vetExclusivePage` | Vet hero image, three vet testimonials, three partner clinics, and four Q&A entries answered by vet author records. |

## Editorial Content Shape

The seed should include practical, non-medical, brand-safe content. Pawrenting tips should be parent-friendly and tactical, blog posts should support brand education and meal transition journeys, and vet articles should use careful wording such as “may support,” “discuss with your veterinarian,” and “for general education,” rather than making unverified medical claims.

| Type | Proposed Records |
|---|---|
| `pawrentingTip` | Transitioning to fresh food, picky eater routine, storing chilled meals, reading pet stool changes, preparing for first Pawmeals delivery. |
| `blogPost` | Why gently cooked food resonates with pet parents, behind the kitchen, ingredient sourcing, subscription routine, Pawmeals for busy families. |
| `vetArticle` | Balanced nutrition basics, hydration and fresh food, weight management conversations, when to ask a vet about diet changes. |
| `faq` | Products, ordering, delivery, subscriptions, nutrition, and general questions. |

## Implementation Notes

The import workflow should generate deterministic document IDs such as `homepage-main`, `about-page-main`, `catering-page-main`, and `vet-exclusive-main`. Upserts are preferred so the seed can be safely rerun. Image assets should be uploaded first, then referenced by `_type: "image"` fields using `{ _type: "image", asset: { _type: "reference", _ref: assetId }, alt: "..." }` when the schema supports `alt`.
