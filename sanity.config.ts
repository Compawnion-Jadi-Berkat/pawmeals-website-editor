/**
 * Sanity Studio Configuration
 * Project: Pawmeals — Cooked Food Specialist
 * Project ID: lr00lxe1
 * Dataset: production
 *
 * Embedded locally through Next.js:  npm run dev  → http://localhost:3000/studio
 * Standalone v5 deploy:             npm run sanity:deploy
 * Legacy root v4 deploy:            npm run sanity:deploy:root-v4
 *
 * Content structure mirrors the UAT spec (WebsiteDevelopment.xlsx, Sheet 3):
 *   Singletons: Homepage, Catering Page, About Us, Vet Exclusive Page
 *   Collections: Pawrenting Tips, Blog Posts, Vet Articles, FAQs, Authors
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "lr00lxe1";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  // Required when Studio is embedded at /studio; without this Sanity can
  // interpret /studio as an unknown tool route and show “tool not found”.
  basePath: "/studio",
  name: "pawmeals-studio",
  title: "Pawmeals Studio",

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Pawmeals Content")
          .items([
            // ── Global Settings ─────────────────────────────────────────────
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),

            S.divider(),

            // ── Page Singletons ──────────────────────────────────────────────
            S.listItem()
              .title("Homepage")
              .id("homepage")
              .child(S.document().schemaType("homepage").documentId("homepage")),

            S.listItem()
              .title("Catering Page")
              .id("cateringPage")
              .child(S.document().schemaType("cateringPage").documentId("cateringPage")),

            S.listItem()
              .title("About Us")
              .id("aboutPage")
              .child(S.document().schemaType("aboutPage").documentId("aboutPage")),

            S.listItem()
              .title("Vet Exclusive Page")
              .id("vetExclusivePage")
              .child(S.document().schemaType("vetExclusivePage").documentId("vetExclusivePage")),

            S.divider(),

            // ── Commerce and Quiz Content ───────────────────────────────────
            S.documentTypeListItem("productCategory").title("Product Categories"),
            S.documentTypeListItem("product").title("Products"),
            S.documentTypeListItem("quizQuestion").title("Quiz Questions"),
            S.documentTypeListItem("quizResult").title("Quiz Results"),

            S.divider(),

            // ── Content Collections ──────────────────────────────────────────
            S.documentTypeListItem("pawrentingTip").title("Pawrenting Tips"),
            S.documentTypeListItem("blogPost").title("Blog Posts"),
            S.documentTypeListItem("vetArticle").title("Vet Articles"),
            S.documentTypeListItem("faq").title("FAQs"),

            S.divider(),

            // ── People ───────────────────────────────────────────────────────
            S.documentTypeListItem("author").title("Authors / Vets"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, { schemaType }) => {
      const singletons = ["homepage", "cateringPage", "aboutPage", "vetExclusivePage", "siteSettings"];
      if (singletons.includes(schemaType)) {
        return prev.filter(({ action }) => action !== "delete" && action !== "duplicate");
      }
      return prev;
    },
  },
});
