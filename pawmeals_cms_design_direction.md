# Pawmeals CMS Design Direction

This direction applies the UI/UX design guidance to Sanity content seeding. The goal is not to hard-code new interface sections, but to make the existing CMS-driven pages feel complete, warm, premium, and credible once content is created through Sanity.

## Design Intent

Pawmeals should read as a **warm, premium, science-backed fresh pet-food brand**. The seeded content should combine human warmth, pet wellbeing, vet credibility, and convenient home delivery. The site already uses a warm cream, caramel, brown, and sage visual language, so the content should reinforce that palette with natural kitchen imagery, healthy pets, ingredients, veterinary trust cues, and family-at-home lifestyle scenes.

| Area | CMS Content Direction | Visual Effect on Website |
|---|---|---|
| Homepage hero | Big emotional promise, fresh-food imagery, clear product CTA | Immediate brand comprehension and strong first impression |
| Why Pawmeals | Natural ingredients, vet trust, health-specific formulas, chilled delivery | Makes value proposition scannable and credible |
| Testimonials | Pet-parent stories with dog/cat names and photos | Adds social proof and emotional specificity |
| Vet content | Vet authors, Q&A, preventive nutrition topics | Makes brand feel safer and professionally endorsed |
| About page | Founder/brand story, mission, proof points, milestones | Gives credibility beyond product claims |
| Catering page | Event/clinic/community feeding services with gallery | Shows Pawmeals as operationally real and visually active |
| Articles and tips | Practical pawrenting content and vet articles | Fills blog/vet sections with realistic previews and images |

## Content Voice

The voice should be **reassuring, specific, warm, and practical**. Headlines should avoid generic filler such as “best quality product” and instead say what Pawmeals does in real situations: freshly cooked meals, vet-informed portions, gentle transitions, chilled delivery, picky-eater support, and special formulas for common health needs.

## Image Direction

Images should come from free online sources and be uploaded as Sanity image assets. Preferred images are fresh pet-food bowls, dogs and cats in warm home settings, ingredients such as chicken, pumpkin, rice, carrots, and leafy greens, plus clinic/vet-style images for professional trust. Each uploaded image should include a source URL and alt text in the seed script metadata or handoff file.

## Implementation Guardrail

All website-visible content should be created as Sanity documents using the existing schema types: `homepage`, `aboutPage`, `cateringPage`, `vetExclusivePage`, `blogPost`, `pawrentingTip`, `vetArticle`, `faq`, and `author`. The frontend should remain CMS-driven; no new hard-coded homepage cards, testimonials, articles, or images should be added directly to React components.

## Frontend Visibility Finding

The current frontend is only partly CMS-driven. The homepage route uses Sanity for hero slides, why-Pawmeals cards, homepage testimonials, and vet partner quotes. However, the current About, Catering, Vet, and Blog routes still contain hard-coded page content even though matching schemas and Sanity queries exist. Therefore, the fastest visible win is to seed homepage records first, while a complete “no hard-coded items” website preview also requires wiring those existing pages to their existing Sanity queries.

| Page | Existing Schema | Existing Query | Currently Rendered from Sanity | Recommended Next Action |
|---|---:|---:|---:|---|
| Homepage | Yes | Yes | Yes, partial homepage sections | Seed immediately |
| About | Yes | Yes | No | Wire page to `getAboutFullContent()` |
| Catering | Yes | Yes | No | Wire page to `getCateringFullContent()` |
| Vet Exclusive / Vet | Yes | Yes | No | Wire page to `getVetExclusiveContent()` or route consistently |
| Blog / Tips / Vet Articles | Yes | Yes | No for listing pages observed | Wire listing/detail pages to Sanity queries before relying on seeded articles |

