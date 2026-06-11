# Sanity Studio Deployment Findings

## Current repository observations

The repository contains two Sanity Studio configurations:

| Area | Path | Intended purpose | Sanity version indicated |
|---|---|---|---|
| Root / embedded Studio | `sanity.config.ts`, `sanity.cli.ts`, `src/app/studio/[[...tool]]/page.tsx` | Next.js embedded `/studio` route and root CLI scripts | Root `package.json` uses `sanity` `^4.22.0` and `@sanity/vision` `^4.22.0` |
| Standalone Studio | `studio/sanity.config.ts`, `studio/sanity.cli.ts`, `studio/package.json` | Sanity-hosted `pawmeals-studio.sanity.studio` | `studio/package.json` uses `sanity` `^5.23.0` and `@sanity/vision` `^5.23.0` |

The root `package.json` script `sanity:deploy` runs `sanity deploy` from the repository root. That deploys the root Studio configuration with Sanity v4. Therefore, if deployment was run as `pnpm sanity:deploy` or from the Vercel/root project, the hosted URL can keep showing v4.

The standalone Studio README says to deploy from inside `studio/` using `npm install` and `npx sanity deploy`. This is likely the correct deploy path for v5.

The embedded Studio route exists at `src/app/studio/[[...tool]]/page.tsx` and dynamically imports `next-sanity/studio` plus the root `sanity.config.ts`. It uses the catch-all `[[...tool]]` convention, but the Next.js App Router uses route segments as folders. The route should match `/studio` and nested Studio tool paths if the folder is named exactly as a catch-all segment.

## Current Sanity documentation findings

Sanity Studio deployment docs, last observed on 2026-05-07, state that `sanity deploy` must be run from the Studio project folder. The command builds the source files in that Studio project and uploads static files to the selected `*.sanity.studio` domain.

The docs also say subsequent deploys can select an existing hostname interactively or specify `studioHost` in `sanity.cli.ts` for automated deployments. For CI/CD, Sanity recommends having `sanity.cli.ts` in the Studio folder and providing `SANITY_AUTH_TOKEN`.

For self-hosting or embedding, the docs emphasize SPA routing and CORS domain configuration. Most embedded Studio cases require setting `basePath`, and Sanity notes that Studio config `basePath` defines the workspace base path. If the Studio is served at `/studio`, config should include an appropriate `basePath` for embedded use.

A Sanity help page says older project metadata properties `studioHost` and `externalStudioHost` are deprecated as project metadata fields, but `studioHost` still appears in current CLI deployment examples as a config value.

## Working hypothesis

The hosted Sanity Studio showing v4 is almost certainly because the root Studio was deployed to `pawmeals-studio.sanity.studio`, not the standalone `studio/` project. The root deploy command and root Sanity dependency are v4.

The Vercel embedded `/studio` route saying `tool not found` is likely an embedded route/base path issue, route deployment issue, or stale Vercel deployment. Next step is to run local build and inspect route output/errors, then add `basePath: "/studio"` to the embedded root `sanity.config.ts` if needed.
