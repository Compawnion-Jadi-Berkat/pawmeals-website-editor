import { defineField, defineType } from "sanity";

const FONT_LIST = [
  { title: "Varela Round (default heading)", value: "Varela Round" },
  { title: "Nunito Sans (default body)", value: "Nunito Sans" },
  { title: "Manrope", value: "Manrope" },
  { title: "Inter", value: "Inter" },
  { title: "Poppins", value: "Poppins" },
  { title: "Playfair Display", value: "Playfair Display" },
  { title: "DM Sans", value: "DM Sans" },
  { title: "Work Sans", value: "Work Sans" },
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand" },
    { name: "nav", title: "Navigation" },
    { name: "socials", title: "Social & Contact" },
    { name: "theme", title: "Colors & Fonts" },
    { name: "flags", title: "Feature Flags" },
  ],
  fields: [
    defineField({ name: "brandName", title: "Brand Name", type: "string", group: "brand", initialValue: "Pawmeals", validation: (Rule) => Rule.required() }),
    defineField({ name: "logo", title: "Logo", type: "image", group: "brand", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "brand", initialValue: "Cooked Pet Nutrition" }),
    defineField({ name: "defaultOgImage", title: "Default Social Sharing Image", type: "image", group: "brand", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),

    defineField({
      name: "navItems", title: "Navigation Items", type: "array", group: "nav",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label", type: "string", validation: (R) => R.required() }),
          defineField({ name: "href", title: "Link", type: "string", validation: (R) => R.required() }),
          defineField({ name: "iconImage", title: "Icon (optional upload)", type: "image", description: "Transparent PNG/SVG recommended.", fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
        ],
        preview: { select: { title: "label", subtitle: "href", media: "iconImage" } },
      }],
    }),
    defineField({
      name: "footerLinks", title: "Footer Links", type: "array", group: "nav",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label", type: "string" }),
          defineField({ name: "href", title: "Link", type: "string" }),
          defineField({ name: "group", title: "Group", type: "string", options: { list: ["shop", "company", "legal", "support"] } }),
        ],
        preview: { select: { title: "label", subtitle: "group" } },
      }],
    }),

    defineField({
      name: "socials", title: "Social Links", type: "array", group: "socials",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "platform", title: "Platform", type: "string", options: { list: ["instagram", "tiktok", "whatsapp", "email", "facebook", "youtube", "x", "custom"] } }),
          defineField({ name: "label", title: "Label (for custom)", type: "string" }),
          defineField({ name: "url", title: "URL", type: "url" }),
          defineField({ name: "iconImage", title: "Custom Icon (optional)", type: "image", description: "Overrides the default icon.", fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })] }),
        ],
        preview: { select: { title: "platform", subtitle: "url", media: "iconImage" } },
      }],
    }),
    defineField({ name: "whatsappNumber", title: "WhatsApp Number", type: "string", group: "socials" }),
    defineField({ name: "email", title: "Public Email", type: "string", group: "socials" }),
    defineField({ name: "phone", title: "Public Phone", type: "string", group: "socials" }),
    defineField({ name: "location", title: "Display Location", type: "string", group: "socials" }),
    defineField({ name: "vetClinicCount", title: "Vet Clinic Trust Count", type: "string", group: "socials" }),

    defineField({ name: "primaryColor", title: "Primary Color", type: "string", group: "theme", description: "Hex, default #D8615A" }),
    defineField({ name: "accentColor", title: "Accent Color", type: "string", group: "theme", description: "Hex, default #F2B943" }),
    defineField({ name: "beigeColor", title: "Beige / Surface Color", type: "string", group: "theme", description: "Hex, default #FAE7D8" }),
    defineField({ name: "charcoalColor", title: "Ink / Charcoal Color", type: "string", group: "theme", description: "Hex, default #323232" }),
    defineField({ name: "headingFont", title: "Heading Font", type: "string", group: "theme", options: { list: FONT_LIST }, initialValue: "Varela Round" }),
    defineField({ name: "bodyFont", title: "Body Font", type: "string", group: "theme", options: { list: FONT_LIST }, initialValue: "Nunito Sans" }),

    defineField({ name: "hideFooterWhatsAppBar", title: "Hide WhatsApp Bar in Footer", type: "boolean", group: "flags", description: "Turn on to remove the duplicate WhatsApp CTA above the footer.", initialValue: false }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
