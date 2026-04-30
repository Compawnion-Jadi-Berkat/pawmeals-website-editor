# Pawmeals Website — PROJECT.md

## Vision
A premium bilingual (Bahasa Indonesia + English) brand and e-commerce hub for Pawmeals — Indonesia's #1 cooked pet food specialist. The website educates before it sells, drives D2C revenue, and provides a bespoke KPI dashboard for the marketing team.

## Locked Tech Stack

| Layer | Technology | Location |
|---|---|---|
| Frontend | Next.js 14 App Router + TypeScript | Vercel |
| Styling | Tailwind CSS (Pawmeals brand tokens) | Bundled |
| E-commerce | Shopify Headless (Storefront API + Admin API) | Shopify cloud |
| CMS | Sanity.io (Headless) | Sanity cloud |
| Backend API | Node.js + Express | AWS EC2 port 3001 (PM2) |
| ORM | Drizzle ORM | EC2 → AWS RDS |
| Database | PostgreSQL 17.6 on AWS RDS | `pawmeals_db` |
| Process Manager | PM2 (autostart on reboot) | EC2 |
| Payments | Xendit (IDR) + Stripe (international) | Server-side API |
| Email | Klaviyo | API |
| Customer Service | Gorgias | Widget + API |
| Analytics | GTM + GA4 + Meta Pixel + TikTok Pixel | Client-side |
| Automation | n8n | AWS EC2 (separate process) |
| i18n | next-intl | Bundled |

## AWS Infrastructure

| Resource | Value |
|---|---|
| EC2 IP | 13.229.189.141 |
| EC2 Region | ap-southeast-1 (Singapore) |
| EC2 OS | Amazon Linux 2023 |
| EC2 User | ec2-user |
| RDS Cluster | corporate-database-1.cluster-cz4isw8uucq7.ap-southeast-1.rds.amazonaws.com |
| RDS Port | 5432 |
| RDS User | cattodomain |
| RDS Database | pawmeals_db (created Apr 2026) |
| RDS Engine | PostgreSQL 17.6 |
| Pawmeals Backend Port | 3001 |
| Existing Ports (DO NOT TOUCH) | 3000 (whatsapp-bedrock-service), 80/443 (nginx) |

## Data Architecture

### Shopify (Source of Truth for E-commerce)
- Products, variants, inventory, pricing
- Cart and checkout sessions
- Orders and fulfillments
- Customer accounts and addresses
- Subscriptions (via Shopify Subscriptions API)

### Sanity.io (Source of Truth for Content)
- Homepage banners and sections
- Blog posts (Pawrenting Tips)
- FAQs
- Vet content (Vet Exclusive section)
- Product enrichment (feeding guides, nutrition stories)
- Team and about content

### AWS RDS `pawmeals_db` (Source of Truth for Analytics & KPI)
- User profiles and authentication sessions
- Behavioural events (page views, quiz completions, product views)
- Session tracking (UTM source, referrer, device)
- KPI aggregates (daily/weekly/monthly rollups)
- Marketing attribution (first touch, last touch)
- Subscription analytics (churn, LTV, retention)

## Key Business KPIs to Track (from Brand Playbook)
1. Monthly Sales Revenue
2. Conversion Rate (visitors → purchase)
3. New Customers (monthly)
4. Retained Customers (monthly)
5. Shop Visitors (monthly)
6. Product Page Views
7. Add-to-Cart Rate
8. Purchases
9. Average Basket Size
10. Retention Rate
11. ROAS (Return on Ad Spend — target >3, current 4.79)

## Pages (8 Core)
1. Homepage `/` — hero carousel, brand story, product preview, quiz CTA
2. Pawmeals Catering `/catering` — B2B catering service
3. Our Products `/products` — catalogue grid (12 SKUs)
4. About Us `/about` — brand story, team, values
5. Pawrenting Tips `/pawrenting-tips` — blog
6. Find Your Pawfect Pawmeals `/quiz` — interactive recommendation quiz
7. FAQs `/faqs` — structured FAQ with JSON-LD
8. Vet Exclusive `/vet-exclusive` — gated vet partner content

## AEO / AI Search Optimization
- Organization schema on homepage
- Product schema on all 12 SKU pages
- FAQPage schema on /faqs and blog posts
- Article schema on all blog posts and vet content
- robots.txt allowing all crawlers
- XML sitemap auto-generated
- Semantic HTML5 throughout
- Open Graph + Twitter Card meta on all pages
