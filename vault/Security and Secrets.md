---
type: security-note
status: active
owner: Eddie Amintohir
project: Pawmeals Website Editor
severity: high
tags: [security, secrets, github, vercel, sanity]
updated: 2026-05-22
---

# Security and Secrets

This project has used temporary GitHub and Vercel authorization during emergency deployment work. Future agents must avoid printing, committing, or documenting actual tokens. If a credential is pasted into chat or terminal history, the safe recommendation is to revoke or rotate it after the task.

| Secret Type | Where It May Be Used | Rule |
|---|---|---|
| GitHub PAT | Emergency push when normal auth is unavailable | Use only through a non-echoing helper or credential helper; never commit or print it. |
| Vercel auth | Deployment inspection or promotion | Prefer official login/promotion flow; do not store credentials in repo. |
| Sanity token | Studio/private content operations | Public published website reads should not depend on a token. |
| Environment variables | Vercel and local `.env` | Use `.env.example` as an inventory, not as a source of live secrets. |

## Public Sanity Read Rule

The production website should read published Sanity content publicly through `src/lib/sanity/client.ts`. Do not attach `SANITY_API_TOKEN` to ordinary published public reads, because a stale or invalid private token can break pages that should otherwise render public content.
