---
type: runbook
status: active
owner: Eddie Amintohir
project: Pawmeals Website Editor
subsystem: production
severity: critical
tags: [debugging, blank-page, sanity, vercel]
updated: 2026-05-22
---

# Debugging - Blank or Empty Production Page

The most recent production incident showed a page shell with little or no main content because Studio-driven components were correctly refusing to render hardcoded fallback content, while production Sanity reads were failing or returning empty data. The fix was to make public published reads resilient without reintroducing fake content.

| Symptom | Likely Cause | First Inspection Point |
|---|---|---|
| Header/footer visible, main content empty | Sanity query returned `null` or empty arrays | `src/lib/sanity/client.ts` and route fetch calls. |
| Works locally but not on Vercel | Wrong/stale Vercel Sanity env vars or invalid token attached to public reads | Sanity client config and Vercel env settings. |
| Latest GitHub commit not reflected on production URL | Vercel alias serving older deployment | Vercel deployment list, production alias, asset chunk hashes. |
| Studio content exists but route still empty | Query filter mismatch, locale mismatch, draft-only content, or unpublished document | GROQ query and published Sanity dataset. |

## Required Checks

| Step | Command or Action | Expected Result |
|---|---|---|
| 1 | Open production URL with a cache-busting query, such as `/en?debug=<commit>`. | Confirms whether browser cache is masking a fixed deployment. |
| 2 | Fetch HTML with `curl -sS -D headers.txt https://pawmeals-website-editor.vercel.app/en -o page.html`. | Allows comparison of server-rendered content and chunk hashes. |
| 3 | Inspect `src/lib/sanity/client.ts`. | Public reads should use `perspective: "published"` without requiring `SANITY_API_TOKEN`. |
| 4 | Query Sanity directly if content is suspect. | Confirms whether published documents exist in `lr00lxe1/production`. |
| 5 | Run `npm run type-check` and `npm run build`. | Confirms the fix compiles before pushing. |
| 6 | Push, wait for Vercel, and recheck production HTML plus browser. | Confirms production route is no longer empty. |

## Known Fix Pattern

The current safe pattern is implemented in `fetchWithCanonicalFallback` in `src/lib/sanity/client.ts`. If Vercel points at a wrong project or dataset, important reads can fall back to the canonical Pawmeals Studio project. If a private token is invalid, public reads should still succeed because published content is read without attaching that token.

> **Do not solve a blank page by restoring hardcoded content.** A blank Studio-driven section should lead to a Sanity/debugging fix, a clear editor empty-state, or a missing-content warning, not fake catalogue data.
