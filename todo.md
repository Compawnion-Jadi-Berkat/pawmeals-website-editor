# Pawmeals Website — Project TODO

## Phase 2: Scaffold & Foundation
- [x] Create Next.js 14 App Router directory structure
- [x] Write package.json with all dependencies
- [x] Write next.config.ts with i18n, image domains, security headers
- [x] Write .env.example with all variables documented
- [ ] Write tailwind.config.ts with Pawmeals brand design tokens
- [ ] Write src/styles/globals.css with brand CSS variables
- [ ] Write src/i18n/request.ts and routing config
- [ ] Write src/i18n/messages/en.json (English strings)
- [ ] Write src/i18n/messages/id.json (Bahasa Indonesia strings)
- [ ] Write src/app/layout.tsx (root layout with fonts, GTM)
- [ ] Write src/app/[locale]/layout.tsx (locale layout)
- [ ] Write src/components/layout/Navbar.tsx (bilingual nav)
- [ ] Write src/components/layout/Footer.tsx
- [ ] Write src/types/index.ts (all TypeScript interfaces)

## Phase 3: Data Layer
- [ ] Write src/lib/shopify/client.ts (Storefront API GraphQL client)
- [ ] Write src/lib/shopify/queries.ts (product, collection, cart queries)
- [ ] Write src/lib/shopify/types.ts
- [ ] Write sanity/schemas/product.ts
- [ ] Write sanity/schemas/blogPost.ts
- [ ] Write sanity/schemas/faq.ts
- [ ] Write sanity/schemas/vetContent.ts
- [ ] Write sanity/schemas/homepage.ts
- [ ] Write sanity/lib/client.ts
- [ ] Write sanity/lib/queries.ts
- [ ] Write sanity/lib/image.ts
- [ ] Write sanity.config.ts
- [ ] Write src/lib/db/schema.ts (Drizzle PostgreSQL schema)
- [ ] Write src/lib/db/client.ts (RDS connection)
- [ ] Write src/lib/db/migrations/ (initial migration SQL)

## Phase 4: Core Pages (8 pages)
- [ ] Homepage (/) with hero carousel, brand story, product preview
- [ ] Pawmeals Catering (/catering)
- [ ] Our Products (/products) — catalogue grid
- [ ] About Us (/about) with Organization JSON-LD
- [ ] Pawrenting Tips (/pawrenting-tips) — blog listing
- [ ] Blog post detail (/pawrenting-tips/[slug]) with Article JSON-LD
- [ ] Find Your Pawfect Pawmeals (/quiz) — interactive quiz
- [ ] FAQs (/faqs) with FAQPage JSON-LD
- [ ] Vet Exclusive (/vet-exclusive) with gated content

## Phase 5: Product Catalogue (12 SKUs)
- [ ] Product detail page (/products/[slug]) with Product JSON-LD
- [ ] 12 product data entries in Shopify + Sanity
- [ ] Nutrition info component
- [ ] Feeding guide component
- [ ] Vet badge component
- [ ] Customer reviews component
- [ ] Related products component

## Phase 6: E-commerce
- [ ] Cart sidebar/drawer component
- [ ] Cart context + state management
- [ ] Checkout page with account requirement
- [ ] Xendit payment integration (IDR)
- [ ] Stripe payment integration (international)
- [ ] Order confirmation page
- [ ] Subscription portal (/account/subscriptions) — Ollie-style
- [ ] Subscription creation flow
- [ ] Subscription management (pause, skip, cancel)
- [ ] Account dashboard (/account)
- [ ] Order history (/account/orders)

## Phase 7: Integrations & Analytics
- [ ] GTM script injection in layout
- [ ] GA4 event tracking (quiz completion, ATC, purchase)
- [ ] Meta Pixel integration
- [ ] TikTok Pixel integration
- [ ] Klaviyo newsletter signup
- [ ] Klaviyo abandoned cart webhook
- [ ] Gorgias chat widget
- [ ] WhatsApp Business API placeholder
- [ ] KPI admin dashboard (/admin) — 11 metrics
- [ ] n8n workflow: new-order → WhatsApp confirmation (JSON export)
- [ ] n8n workflow: new-user → Klaviyo sync (JSON export)

## Phase 8: Quality & Deployment
- [ ] AEO JSON-LD: Organization schema (homepage)
- [ ] AEO JSON-LD: Product schema (all 12 SKU pages)
- [ ] AEO JSON-LD: FAQPage schema (FAQs + Pawrenting Tips)
- [ ] AEO JSON-LD: Article schema (blog posts + vet content)
- [ ] robots.txt and sitemap.xml
- [ ] Vitest unit tests (quiz logic, cart, payment helpers)
- [ ] Code review quality gate
- [ ] EC2 deployment script (PM2, port 3001, nginx config)
- [ ] GitHub push to personnel-cjb repo
- [ ] Vercel deployment guide
- [ ] Obsidian vault update
- [ ] Credentials injection guide (.env setup)
