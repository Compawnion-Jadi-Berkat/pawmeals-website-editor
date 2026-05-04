/**
 * Standalone Sanity Studio v5 configuration
 * Deployed to: https://pawmeals-studio.sanity.studio
 *
 * This is the standalone studio for sanity deploy.
 * The Next.js embedded /studio route uses the root sanity.config.ts (v4).
 * Both point to the same dataset (lr00lxe1/production) and are always in sync.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "../sanity/schemas";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "lr00lxe1";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "pawmeals-studio",
  title: "Pawmeals Studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      title: "Content",
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Prevent accidental deletion of singleton documents
    actions: (prev, { schemaType }) => {
      const singletons = ["homepage", "cateringPage", "aboutPage", "vetExclusivePage"];
      if (singletons.includes(schemaType)) {
        return prev.filter(
          ({ action }) => action !== "delete" && action !== "duplicate"
        );
      }
      return prev;
    },
  },
});
