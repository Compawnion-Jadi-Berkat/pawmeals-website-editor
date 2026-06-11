import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── PAWMEALS OFFICIAL BRAND PALETTE ──────────────────────────────────
      // Source: Pawmeals Brand Guidelines for External Usage, v1 14.11.25
      colors: {
        // Official brand colours, mapped onto existing utility names for a minimal safe refresh.
        "pm-cream": "#FAE7D8",        // Pawmeals beige — section / hover base
        "pm-cream-dark": "#F4DED0",   // Deeper beige tint for layered surfaces
        "pm-ivory": "#FDFDFE",        // Pawmeals white — page and glass base
        "pm-sand": "#E8D5CA",         // Warm beige border derived from brand beige
        "pm-caramel": "#D8615A",      // Pawmeals red — primary CTA and active states
        "pm-caramel-dark": "#B94F49", // Accessible red hover state
        "pm-brown": "#323232",        // Pawmeals charcoal — headings and nav text
        "pm-brown-light": "#6F5F59",  // Warm muted text on beige/white
        "pm-terracotta": "#D8615A",   // Red accent alias
        "pm-sage": "#CFCFCE",         // Pawmeals grey — support / neutral surfaces
        "pm-sage-light": "#E8E8E7",   // Light grey tint
        "pm-gold": "#F2B943",         // Pawmeals yellow — premium highlights
        "pm-white": "#FDFDFE",        // Pawmeals white
        "pm-charcoal": "#323232",     // Pawmeals charcoal

        // Semantic aliases
        brand: {
          primary: "#D8615A",
          "primary-dark": "#B94F49",
          secondary: "#323232",
          accent: "#F2B943",
          bg: "#FDFDFE",
          "bg-alt": "#FAE7D8",
          text: "#323232",
          "text-muted": "#6F5F59",
          border: "#E8D5CA",
        },

        // Status colours harmonized with the official warm palette.
        success: "#6E8F6A",
        warning: "#F2B943",
        error: "#D8615A",
      },

      // ─── TYPOGRAPHY ───────────────────────────────────────────────────────
      // Varela Round (headings) + Nunito Sans (body) — warm, friendly, premium
      fontFamily: {
        heading: ["var(--font-varela-round)", "Varela Round", "sans-serif"],
        body: ["var(--font-nunito-sans)", "Nunito Sans", "sans-serif"],
        sans: ["var(--font-nunito-sans)", "Nunito Sans", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "heading-xl": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-lg": ["1.875rem", { lineHeight: "1.25" }],
        "heading-md": ["1.5rem", { lineHeight: "1.3" }],
        "heading-sm": ["1.25rem", { lineHeight: "1.35" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-md": ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "label-lg": ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.05em" }],
        "label-sm": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.06em" }],
      },

      // ─── SPACING & LAYOUT ─────────────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
        "42": "10.5rem",
        "46": "11.5rem",
        "50": "12.5rem",
        "section": "6rem",
        "section-sm": "4rem",
      },
      maxWidth: {
        "content": "1280px",
        "prose": "720px",
        "narrow": "560px",
      },

      // ─── BORDER RADIUS ────────────────────────────────────────────────────
      borderRadius: {
        "xs": "0.25rem",
        "sm": "0.375rem",
        "md": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "3rem",
        "pill": "9999px",
      },

      // ─── SHADOWS (warm-toned, no cool greys) ─────────────────────────────
      boxShadow: {
        "warm-sm": "0 1px 3px 0 rgba(50, 50, 50, 0.08), 0 1px 2px -1px rgba(50, 50, 50, 0.06)",
        "warm-md": "0 4px 6px -1px rgba(50, 50, 50, 0.10), 0 2px 4px -2px rgba(50, 50, 50, 0.08)",
        "warm-lg": "0 10px 15px -3px rgba(50, 50, 50, 0.10), 0 4px 6px -4px rgba(50, 50, 50, 0.08)",
        "warm-xl": "0 20px 25px -5px rgba(50, 50, 50, 0.10), 0 8px 10px -6px rgba(50, 50, 50, 0.08)",
        "warm-2xl": "0 25px 50px -12px rgba(50, 50, 50, 0.20)",
        "card": "0 2px 8px rgba(50, 50, 50, 0.08), 0 0 0 1px rgba(250, 231, 216, 0.60)",
        "card-hover": "0 8px 24px rgba(107, 63, 42, 0.12), 0 0 0 1px rgba(216, 97, 90, 0.28)",
        "cta": "0 4px 14px rgba(216, 97, 90, 0.34)",
        "cta-hover": "0 6px 20px rgba(216, 97, 90, 0.44)",
      },

      // ─── ANIMATIONS ───────────────────────────────────────────────────────
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "paw-bounce": {
          "0%, 100%": { transform: "translateY(0) rotate(-5deg)" },
          "50%": { transform: "translateY(-8px) rotate(5deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-out-right": "slide-out-right 0.3s ease-in",
        "scale-in": "scale-in 0.2s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "paw-bounce": "paw-bounce 2s ease-in-out infinite",
      },

      // ─── BACKGROUND PATTERNS ─────────────────────────────────────────────
      backgroundImage: {
        "paw-pattern": "url('/images/paw-pattern.svg')",
        "grain": "url('/images/grain.png')",
        "hero-gradient": "linear-gradient(135deg, #FDFDFE 0%, #FAE7D8 58%, #F2B943 135%)",
        "card-gradient": "linear-gradient(180deg, rgba(253,253,254,0) 0%, rgba(250,231,216,0.78) 100%)",
        "cta-gradient": "linear-gradient(135deg, #D8615A 0%, #B94F49 100%)",
      },

      // ─── TRANSITIONS ─────────────────────────────────────────────────────
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
