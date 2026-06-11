/**
 * Sanity CLI Configuration
 * This file is read by the Sanity CLI (sanity deploy, sanity dev, etc.)
 * It is separate from sanity.config.ts which is read by the Studio UI.
 *
 * Project: Pawmeals — Cooked Food Specialist
 * Project ID: lr00lxe1
 * Dataset: production
 */
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "lr00lxe1",
    dataset: "production",
  },
  /**
   * Do not configure studioHost here.
   *
   * This root config belongs to the legacy embedded Studio dependency graph
   * used by the Next.js app. Deploy the Sanity-hosted Studio through
   * `npm run sanity:deploy`, which runs from ./studio and uses Sanity v5.
   * Keeping the production host out of the root config prevents accidental
   * `npx sanity deploy` runs from this folder from overwriting the v5 Studio
   * with the root Sanity v4 build.
   */
});
