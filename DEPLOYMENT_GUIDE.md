# Pawmeals Website — Deployment Guide

**Last updated:** April 2026  
**Status:** Backend deployed on EC2. Frontend ready for Vercel. Credentials pending.

---

## Architecture Summary

```
User → Vercel (Next.js frontend) → Shopify API (products/orders)
                                 → Sanity.io (content/blog)
                                 → EC2 port 3001 (backend API)
                                      → AWS RDS pawmeals_db (users/analytics/KPI)
                                      → Klaviyo (email)
                                      → Xendit / Stripe (payments)
```

---

## Step 1 — Configure EC2 Backend Credentials

SSH into EC2 and create the backend `.env` file:

```bash
ssh -i agnosticdata.pem ec2-user@13.229.189.141
cd /home/ec2-user/pawmeals-backend
nano .env
```

Paste and fill in all values from `.env.example`. The RDS endpoint is already pre-filled:

```
DATABASE_URL=postgresql://cattodomain:YOUR_PASSWORD@corporate-database-1.cluster-cz4isw8uucq7.ap-southeast-1.rds.amazonaws.com:5432/pawmeals_db?sslmode=require
```

Get the password from AWS Secrets Manager:
```
arn:aws:secretsmanager:ap-southeast-1:436793505587:secret:rds!cluster-898bb6e5-cb59-4c49-9c83-cddca06f9fa1-uCkupE
```

After filling `.env`, restart the backend:
```bash
pm2 restart pawmeals-backend
pm2 logs pawmeals-backend --lines 20
```

Verify it is running:
```bash
curl http://localhost:3001/api/health
```

---

## Step 2 — Run Database Migration

Once `.env` is configured with the correct `DATABASE_URL`:

```bash
cd /home/ec2-user/pawmeals-backend
npm run db:migrate
```

This creates all tables in `pawmeals_db`:
- `users` — customer accounts
- `sessions` — auth sessions
- `behavioural_events` — page views, clicks, quiz completions
- `quiz_responses` — product recommendation quiz results
- `kpi_snapshots` — daily KPI aggregates
- `newsletter_subscribers` — email list

---

## Step 3 — Configure Nginx (HTTPS for API)

```bash
sudo cp /home/ec2-user/pawmeals-backend/scripts/nginx-pawmeals.conf \
  /etc/nginx/sites-available/pawmeals-api

sudo ln -s /etc/nginx/sites-available/pawmeals-api \
  /etc/nginx/sites-enabled/pawmeals-api

sudo nginx -t
sudo systemctl reload nginx

# Get SSL certificate
sudo certbot --nginx -d api.pawmeals.id
```

---

## Step 4 — Deploy Frontend to Vercel

### Option A — Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import from GitHub: `eddiamintohir1/personnel-cjb`
3. Set **Root Directory** to `pawmeals-website`
4. Set **Framework Preset** to `Next.js`
5. Add all environment variables from `pawmeals-website/.env.example`
6. Click Deploy

### Option B — Via Vercel CLI

```bash
cd /path/to/pawmeals-website
npx vercel --prod
```

### Required Vercel Environment Variables

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | `pawmeals.myshopify.com` |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` | From Shopify Admin → Apps → Develop Apps |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | From sanity.io/manage |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_TOKEN` | From sanity.io/manage → API → Tokens |
| `NEXT_PUBLIC_API_BASE_URL` | `https://api.pawmeals.id` |
| `NEXT_PUBLIC_GTM_ID` | Your GTM container ID |
| `NEXT_PUBLIC_GA4_ID` | Your GA4 Measurement ID |
| `NEXT_PUBLIC_META_PIXEL_ID` | Your Meta Pixel ID |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | Your TikTok Pixel ID |

---

## Step 5 — Configure Shopify Headless

1. Log into Shopify Admin (`pawmeals.website@compawnion.co`)
2. Go to **Settings → Apps and sales channels → Develop apps**
3. Create app: "Pawmeals Headless Website"
4. Under **Configuration**, enable:
   - Storefront API: `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`, `unauthenticated_write_checkouts`, `unauthenticated_read_customers`
   - Admin API: `read_orders`, `read_customers`, `read_analytics`
5. Install the app and copy the **Storefront API access token**
6. Add to Vercel environment variables

---

## Step 6 — Configure Sanity.io

1. Log into [sanity.io/manage](https://sanity.io/manage) with your GitHub account
2. Create a new project: "Pawmeals Website"
3. Copy the **Project ID**
4. Go to **API → Tokens** → Create token with Editor permissions
5. Add Project ID and token to Vercel environment variables
6. Deploy the Sanity Studio:
   ```bash
   cd pawmeals-website/studio  # (if Sanity Studio is included)
   npx sanity deploy
   ```

---

## Step 7 — Import n8n Workflows

1. Install n8n on EC2 (separate from Pawmeals backend):
   ```bash
   npm install -g n8n
   pm2 start n8n --name n8n -- start
   ```
2. Access n8n at `http://13.229.189.141:5678`
3. Import workflows:
   - `n8n-workflows/01_order_confirmation_whatsapp.json`
   - `n8n-workflows/02_klaviyo_customer_sync.json`
4. Configure credentials in n8n for WhatsApp Business API and Klaviyo
5. Activate both workflows

---

## Current Status

| Component | Status | Notes |
|---|---|---|
| **EC2 Backend (port 3001)** | ✅ Running (PM2 id: 6) | Needs `.env` credentials |
| **AWS RDS `pawmeals_db`** | ✅ Created | Needs migration after `.env` |
| **Next.js Frontend** | ✅ Code complete | Needs Vercel deployment |
| **Shopify API** | ⏳ Pending | Needs API token from Shopify Admin |
| **Sanity.io** | ⏳ Pending | Needs project ID and token |
| **Klaviyo** | ⏳ Pending | Add API key to `.env` |
| **Xendit** | ⏳ Pending | Add API key to `.env` |
| **Stripe** | ⏳ Pending | Add API key to `.env` |
| **WhatsApp Business API** | ⏳ Not yet active | Apply via Meta Business Manager |
| **n8n Workflows** | ⏳ Pending | Import JSON files after n8n install |

---

## PM2 Process Reference

```bash
# Check all processes (do NOT stop wfmt-backend or whatsapp-bedrock-service)
pm2 status

# Pawmeals backend only
pm2 logs pawmeals-backend --lines 50
pm2 restart pawmeals-backend
pm2 stop pawmeals-backend
```

---

## GitHub Repository

All code is at: `https://github.com/eddiamintohir1/personnel-cjb`  
Branch: `main-camp`  
Website code: `/pawmeals-website/`
