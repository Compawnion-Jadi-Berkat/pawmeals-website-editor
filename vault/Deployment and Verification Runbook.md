---
type: runbook
status: active
owner: Eddie Amintohir
project: Pawmeals Website Editor
subsystem: deployment
severity: high
tags: [deployment, vercel, github, validation]
updated: 2026-05-22
---

# Deployment and Verification Runbook

Production deploys are driven from the GitHub `main` branch to Vercel. A change is not complete until the code is committed, pushed, deployed by Vercel, and verified on the live URL.

| Phase | Action | Pass Criteria |
|---|---|---|
| Local validation | Run `npm run type-check`. | TypeScript completes without errors. |
| Build validation | Run `npm run build`. | Next.js production build completes. |
| Git commit | Commit with a clear message. | `git log --oneline -1` shows the expected fix. |
| Push | Push to `origin/main`. | Git reports `main -> main`. |
| Vercel deploy | Wait for the Vercel deployment linked to the commit. | Deployment status is ready/successful. |
| Runtime check | Open `https://pawmeals-website-editor.vercel.app/en?after=<commit>`. | Browser shows main content, not only shell layout. |

## Recent Verified Website Updates

| Commit | Purpose | Local Validation |
|---|---|---|
| `104d30b` | Applied Pawmeals brand palette to frontend theme tokens and moved **Quiz** immediately after **Katering** in navigation. | `npm run type-check`, `npm run build`, local production route probes, and browser visual check. |
| `a0736c9` | Added CMS navigation fallbacks and legacy route aliases for implemented public routes. | `npm run type-check`, `npm run build`, and local production route probes. |

## Useful Commands

```bash
cd /home/ubuntu/pawmeals-website-editor-git
npm run type-check
npm run build
git status --short
git log --oneline -5
```

## Vercel Alias Warning

During the blank-page incident, GitHub contained the fix but the public production alias initially appeared to serve an older build. If a fix is pushed but production still looks old, compare the page chunk hash in production HTML with local build assets, then inspect Vercel deployments and aliases.

## Studio Deployment Warning

There are two Studio surfaces. The website contains an embedded Studio at `/studio`, while the standalone hosted Studio is under `studio/`. Use the existing repository scripts and handoff notes before changing Studio deployment configuration.
