/**
 * Sanity Studio Configuration
 * Project: Pawmeals — Cooked Food Specialist
 * Project ID: lr00lxe1
 * Dataset: production
 *
 * Run locally:  pnpm sanity:dev  → http://localhost:3333
 * Deploy:       pnpm sanity:deploy
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
            // ── Page Singletons ──────────────────────────────────────────────
            S.listItem()
              .title("🏠 Homepage")
              .id("homepage")
              .child(S.document().schemaType("homepage").documentId("homepage")),

            S.listItem()
              .title("🍽️ Catering Page")
              .id("cateringPage")
              .child(S.document().schemaType("cateringPage").documentId("cateringPage")),

            S.listItem()
              .title("ℹ️ About Us")
              .id("aboutPage")
              .child(S.document().schemaType("aboutPage").documentId("aboutPage")),

            S.listItem()
              .title("🏥 Vet Exclusive Page")
              .id("vetExclusivePage")
              .child(S.document().schemaType("vetExclusivePage").documentId("vetExclusivePage")),

            S.divider(),

            // ── Content Collections ──────────────────────────────────────────
            S.documentTypeListItem("pawrentingTip").title("🐾 Pawrenting Tips"),
            S.documentTypeListItem("blogPost").title("📝 Blog Posts"),
            S.documentTypeListItem("vetArticle").title("🩺 Vet Articles"),
            S.documentTypeListItem("faq").title("❓ FAQs"),

            S.divider(),

            // ── People ───────────────────────────────────────────────────────
            S.documentTypeListItem("author").title("👤 Authors / Vets"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
