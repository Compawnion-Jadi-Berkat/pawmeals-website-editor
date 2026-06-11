# Pawmeals — Image audit

Project `lr00lxe1` / dataset `production`. Snapshot taken 2026-05-08.

## Fixed in this session

| Where | Before | After |
|---|---|---|
| `homepage` (drafts) | 111×17 PNG used as hero, "Test 1" headline | Draft discarded — published 3-slide hero restored |
| `aboutPage.heroImage` | 500×667 (too small for hero) | 3000×2000 landscape |
| `aboutPage.certifications[cert-preview]` | Literal placeholder text | Removed |
| `cateringPage.gallery[gallery-kitchen]` | 500×667 portrait in gallery | Removed |

## Still needs editor attention

These are real photos but reused across many slots — replace with unique, on-brand assets when possible.

| Asset ref | Size | Used in |
|---|---|---|
| `image-d5290391...-5824x3883-jpg` | landscape | `homepage.heroSlides[hero-clinic-trust].image`, `homepage.vetPartners[vet-raka-homepage].photo`, `vetExclusivePage.heroImage`, `vetExclusivePage.partnerClinics[clinic-happy-paws].logo` (NOT a logo!), `vetExclusivePage.vetTestimonials[vet-testimonial-raka].photo` |
| `image-232dc53c...-3897x5845-jpg` | portrait | `homepage.vetPartners[vet-anisa-homepage].photo`, `vetExclusivePage.partnerClinics[clinic-selatan].logo` (NOT a logo!), `vetExclusivePage.vetTestimonials[vet-testimonial-anisa].photo` |
| `image-1b5dae6a...-500x667-jpg` | 500×667 | Tiny image — currently unused after fixes; remove from dataset if no longer needed. |
| `image-4d4d8234...-111x17-png` | 111×17 | Junk thumbnail — was on the discarded homepage draft. Safe to delete from Assets. |

## Recommended action checklist for the editor

1. Replace **clinic logos** in `vetExclusivePage.partnerClinics[*].logo` with actual square logo PNGs (currently full bleed clinic photos — they will look wrong cropped to a logo slot).
2. Upload distinct photos for each vet partner / testimonial so the same face isn't reused as different people.
3. Confirm hero images on `homepage`, `aboutPage`, `cateringPage`, `vetExclusivePage` are all ≥ 2400px on the long edge for retina rendering.
4. Delete the 111×17 PNG and the 500×667 JPG from the Assets pane once nothing references them.