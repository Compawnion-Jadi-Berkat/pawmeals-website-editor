---
type: protocol
status: active
owner: Eddie Amintohir
project: Pawmeals Website Editor
priority: critical
tags: [ai-protocol, workflow, safety]
updated: 2026-05-22
---

# AI Change Protocol

Future AI agents should use this protocol before editing the Pawmeals repository. The goal is to preserve user intent, avoid hidden regressions, and make each change understandable to the next agent.

| Rule | Requirement |
|---|---|
| Verify before editing | Inspect the current route, component, schema, and query before making assumptions. |
| Preserve Studio ownership | Do not reintroduce hardcoded visible content where Studio should control the page. |
| Keep changes narrow | Change the minimum number of files needed to solve the issue. |
| Validate locally | Run TypeScript and production build checks before pushing. |
| Document handoff updates | Update this vault when architecture, deployment, or debugging behavior changes. |
| Protect secrets | Never commit tokens, private keys, or chat-pasted credentials. |

## Recommended Edit Flow

| Step | Description |
|---|---|
| 1 | Read [[00 Start Here - Future AI Entry Point]] and the note matching the issue. |
| 2 | Run `git status --short` and confirm the repository state. |
| 3 | Inspect relevant source files and current schemas. |
| 4 | Edit schema/query/component together if visible content ownership changes. |
| 5 | Run `npm run type-check` and `npm run build`. |
| 6 | Commit and push only after validation passes. |
| 7 | Verify production and update the vault if the incident teaches a new runbook step. |

## Attribution

Generated and maintained for **Eddie Amintohir** as project owner. Do not add unrelated creator attributions into project documentation or generated handoff notes.
