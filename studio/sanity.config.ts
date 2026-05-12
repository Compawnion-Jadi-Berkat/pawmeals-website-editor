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
import { documentInternationalization } from "@sanity/document-internationalization";
import { schemaTypes } from "../sanity/schemas";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "lr00lxe1";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

const supportedLanguages = [
  { id: "id", title: "Bahasa Indonesia" },
  { id: "en", title: "English" },
];

const localizedSingletonTypes = ["homepage", "aboutPage", "cateringPage", "vetExclusivePage"];
const localizedCollectionTypes = ["blogPost", "vetArticle", "pawrentingTip", "faq", "product"];

export default defineConfig({
  name: "pawmeals-studio",
  title: "Pawmeals Studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      title: "Content",
      structure: (S) => {
        const localizedSingleton = (type: string, title: string) =>
          S.listItem()
            .title(title)
            .id(type)
            .child(
              S.list()
                .title(title)
                .items(
                  supportedLanguages.map((language) =>
                    S.listItem()
                      .title(language.title)
                      .id(`${type}__${language.id}`)
                      .child(S.document().schemaType(type).documentId(`${type}__${language.id}`))
                  )
                )
            );

        return S.list()
          .title("Pawmeals Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            localizedSingleton("homepage", "Homepage"),
            localizedSingleton("cateringPage", "Catering Page"),
            localizedSingleton("aboutPage", "About Us"),
            localizedSingleton("vetExclusivePage", "Vet Exclusive Page"),
            S.divider(),
            S.documentTypeListItem("productCategory").title("Product Categories"),
            S.documentTypeListItem("product").title("Products"),
            S.documentTypeListItem("quizQuestion").title("Quiz Questions"),
            S.documentTypeListItem("quizResult").title("Quiz Results"),
            S.divider(),
            S.documentTypeListItem("pawrentingTip").title("Pawrenting Tips"),
            S.documentTypeListItem("blogPost").title("Blog Posts"),
            S.documentTypeListItem("vetArticle").title("Vet Articles"),
            S.documentTypeListItem("faq").title("FAQs"),
            S.documentTypeListItem("author").title("Authors / Vets"),
          ]);
      },
    }),
    documentInternationalization({
      supportedLanguages,
      schemaTypes: [...localizedSingletonTypes, ...localizedCollectionTypes],
      languageField: "language",
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Prevent accidental deletion of singleton documents
    actions: (prev, { schemaType }) => {
      const singletons = ["homepage", "cateringPage", "aboutPage", "vetExclusivePage", "siteSettings"];
      if (singletons.includes(schemaType)) {
        return prev.filter(
          ({ action }) => action !== "delete" && action !== "duplicate"
        );
      }
      return prev;
    },
  },
});
