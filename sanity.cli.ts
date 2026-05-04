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
   * studioHost sets the subdomain for sanity.io hosting.
   * Studio will be deployed to: https://pawmeals-studio.sanity.studio
   */
  studioHost: "pawmeals-studio",
});
