---
type: vault-index
status: active
owner: Eddie Amintohir
project: Pawmeals Website Editor
tags: [pawmeals, handover, obsidian, ai-context]
updated: 2026-05-22
---

# Pawmeals AI Handover Vault

This folder is an **Obsidian-compatible vault inside the GitHub repository**. It is designed so future AI agents and human editors can quickly understand where the Pawmeals website begins, which Sanity Studio records control visible content, how deployments work, and where to debug when a page breaks.

The first note to open is [[00 Start Here - Future AI Entry Point]]. That note links to the architecture overview, page editing map, Sanity source-of-truth map, and production debugging runbooks.

| Need | Start Here |
|---|---|
| Edit a page or content section | [[Page Editing Map]] |
| Understand the stack and repository layout | [[Architecture Overview]] |
| Debug blank pages or missing Studio content | [[Debugging - Blank or Empty Production Page]] |
| Understand Sanity Studio documents and schemas | [[Sanity Studio Source of Truth]] |
| Deploy or verify a fix | [[Deployment and Verification Runbook]] |
| Follow a safe AI change process | [[AI Change Protocol]] |

> **Rule for future AI agents:** treat this vault as the starting context, but verify the current code before editing. The repository can change faster than documentation, so use the file paths in these notes as the first inspection targets rather than as a substitute for code review.

## Bases

The vault includes Obsidian Bases so future agents can view project notes as tables.

| Base File | Purpose |
|---|---|
| [[Pawmeals Pages.base]] | Shows route notes and their Sanity documents/components. |
| [[Sanity Content Model.base]] | Shows Studio schemas and their frontend consumers. |
| [[Debugging Runbooks.base]] | Shows troubleshooting notes by severity and subsystem. |

## Repository Location

The vault lives at `vault/` in the `Compawnion-Jadi-Berkat/pawmeals-website-editor` repository. Commit future handover updates together with code changes when the update changes architecture, data ownership, deployment behavior, or known debugging workflows.
