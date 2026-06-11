# Pawmeals — Schema & i18n hand-off

These changes go in your **`pawmeals-website-editor`** repo (the local Sanity Studio that deploys workspace `pawmeals-studio`). After editing, deploy with:

```bash
npx sanity@latest schema deploy
# or, if Studio is in a sub-folder:
cd studio && npx sanity@latest schema deploy
```

Project: `lr00lxe1`  ·  dataset: `production`  ·  workspace: `pawmeals-studio`.

---

## 1. New schema types

### 1.1 `siteSettings` (singleton)

`schemas/documents/siteSettings.ts`:

```ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "brandName", type: "string", initialValue: "Pawmeals" }),
    defineField({ name: "logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "defaultOgImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "navItems",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "label", type: "string", validation: r => r.required() },
          { name: "href",  type: "string", validation: r => r.required() },
        ],
      }],
    }),
    defineField({
      name: "footerLinks",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "label", type: "string" },
          { name: "href",  type: "string" },
          { name: "group", type: "string", options: { list: ["company", "legal", "support"] } },
        ],
      }],
    }),
    defineField({
      name: "socials",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "platform", type: "string", options: { list: ["instagram","tiktok","whatsapp","email"] } },
          { name: "url", type: "url" },
        ],
      }],
    }),
    defineField({ name: "whatsappNumber", type: "string" }),
    defineField({ name: "primaryColor", type: "string", description: "hex, e.g. #C2410C" }),
    defineField({ name: "accentColor",  type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
```

Make it a singleton in `sanity.config.ts` (filter from "create new" menu):

```ts
structure: (S) => S.list().title("Content").items([
  S.listItem().title("Site Settings").id("siteSettings")
   .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
  S.divider(),
  ...S.documentTypeListItems().filter(li => !["siteSettings","homepage","aboutPage","cateringPage","vetExclusivePage"].includes(li.getId() ?? "")),
])
```

### 1.2 `productCategory`

```ts
// schemas/documents/productCategory.ts
import { defineType } from "sanity";
export default defineType({
  name: "productCategory",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "description", type: "text" },
  ],
});
```

### 1.3 `product`

```ts
// schemas/documents/product.ts
import { defineType, defineField } from "sanity";
export default defineType({
  name: "product",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: r => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: r => r.required() }),
    defineField({ name: "category", type: "reference", to: [{ type: "productCategory" }] }),
    defineField({ name: "shortDescription", type: "text", rows: 2 }),
    defineField({ name: "longDescription", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string" }] }],
    }),
    defineField({
      name: "pricingTiers",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "label", type: "string" },          // e.g. "Weekly"
          { name: "weightLabel", type: "string" },    // "Small / Medium / Large"
          { name: "priceIDR", type: "number" },
          { name: "note", type: "string" },
        ],
      }],
    }),
    defineField({ name: "ingredients", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "feedingGuide", type: "text" }),
    defineField({ name: "availableLocales", type: "array", of: [{ type: "string" }],
      options: { list: ["id","en"] }, initialValue: ["id","en"] }),
  ],
});
```

### 1.4 `quizQuestion` and `quizResult`

```ts
// schemas/documents/quizQuestion.ts
import { defineType } from "sanity";
export default defineType({
  name: "quizQuestion",
  type: "document",
  fields: [
    { name: "order", type: "number" },
    { name: "question", type: "string" },
    { name: "key", type: "string", description: "snake_case key used by the frontend" },
    {
      name: "options",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "label", type: "string" },
          { name: "value", type: "string" },
          { name: "scores", type: "array", of: [{
              type: "object",
              fields: [
                { name: "resultKey", type: "string" },
                { name: "weight", type: "number" },
              ],
          }] },
        ],
      }],
    },
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});

// schemas/documents/quizResult.ts
import { defineType } from "sanity";
export default defineType({
  name: "quizResult",
  type: "document",
  fields: [
    { name: "key", type: "string" },
    { name: "title", type: "string" },
    { name: "description", type: "text" },
    { name: "recommendedProducts", type: "array", of: [{ type: "reference", to: [{ type: "product" }] }] },
    { name: "image", type: "image", options: { hotspot: true } },
  ],
});
```

### 1.5 Register them

`schemas/index.ts`:

```ts
import siteSettings from "./documents/siteSettings";
import product from "./documents/product";
import productCategory from "./documents/productCategory";
import quizQuestion from "./documents/quizQuestion";
import quizResult from "./documents/quizResult";

export const schemaTypes = [
  // ...existing types
  siteSettings, product, productCategory, quizQuestion, quizResult,
];
```

---

## 2. i18n — recommended approach

Install the official plugin:

```bash
npm i @sanity/document-internationalization
```

`sanity.config.ts`:

```ts
import { documentInternationalization } from "@sanity/document-internationalization";

export default defineConfig({
  // ...
  plugins: [
    documentInternationalization({
      supportedLanguages: [
        { id: "id", title: "Bahasa Indonesia" },
        { id: "en", title: "English" },
      ],
      schemaTypes: [
        "homepage", "aboutPage", "cateringPage", "vetExclusivePage",
        "blogPost", "vetArticle", "pawrentingTip", "faq", "product",
      ],
      defaultLanguages: ["id"],
    }),
  ],
});
```

The plugin auto-adds a `language` field to each listed type and a "Translations" panel in Studio. **No schema changes are needed for those types** — but the singletons stop being singletons (you now get one document per locale), so update Structure builder accordingly:

```ts
const localizedSingleton = (type: string) =>
  S.listItem().title(type).child(
    S.list().title(type).items([
      S.listItem().title("Bahasa Indonesia").id(`${type}__id`)
        .child(S.document().schemaType(type).documentId(`${type}__id`)),
      S.listItem().title("English").id(`${type}__en`)
        .child(S.document().schemaType(type).documentId(`${type}__en`)),
    ])
  );
```

### Frontend GROQ change

```ts
const homepage = await client.fetch(
  `*[_type=="homepage" && language==$lang][0]`,
  { lang: params.locale } // "id" or "en"
);
```

### One-shot migration

After the plugin is registered, seed both locales by duplicating the current singleton content. Save this as `scripts/seed-locales.ts` in the Studio repo:

```ts
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "lr00lxe1", dataset: "production",
  apiVersion: "2024-01-01", token: process.env.SANITY_WRITE_TOKEN, useCdn: false,
});

const SINGLETONS = ["homepage", "aboutPage", "cateringPage", "vetExclusivePage"];
const LOCALES = ["id", "en"];

for (const type of SINGLETONS) {
  const src = await client.getDocument(type);
  if (!src) continue;
  for (const lang of LOCALES) {
    const id = `${type}__${lang}`;
    await client.createOrReplace({ ...src, _id: id, language: lang });
    console.log("seeded", id);
  }
}
```

Run with `SANITY_WRITE_TOKEN=... npx tsx scripts/seed-locales.ts`.

---

## 3. Done in this session (no action needed from you)

- Discarded `drafts.homepage` (the "Test 1" / 111×17 placeholder hero is gone — the rich published homepage now renders on `/id` and `/en`).
- Removed the literal "Replace this CMS placeholder…" entry from `aboutPage.certifications`.
- Replaced `aboutPage.heroImage` (was 500×667) with `image-9a965d476a518bb38141bb10673314e4bb0ddb35-3000x2000-jpg`.
- Removed the same 500×667 image from `cateringPage.gallery`.
- Republished both pages.

## 4. Still hard-coded in your Vercel repo (out of scope here)

- Layout/CSS, fonts, brand colors.
- `/id` vs `/en` routing logic — needs to read `language` once the plugin is in.
- `/products` and `/quiz` pages — currently not CMS-driven (no `product`/`quiz` types existed). Use the schemas above.
- Visual Editing / Presentation tool config (likely cause of the original "Failed to connect to the dashboard store" error — confirm `studioUrl` / CORS in `sanity.config.ts` and `next-sanity` config).