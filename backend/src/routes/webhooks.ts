import { Router, Request, Response } from "express";
import crypto from "crypto";
import { db } from "../db/index.js";
import { events, users } from "../db/schema/index.js";

export const webhooksRouter = Router();

// ─── SHOPIFY ORDER WEBHOOK ────────────────────────────────────────────────────
// Triggered when a new order is placed in Shopify
// Shopify sends: POST /api/webhooks/shopify/orders/create

webhooksRouter.post("/shopify/orders/create", async (req: Request, res: Response) => {
  // Verify Shopify HMAC signature
  const hmac = req.headers["x-shopify-hmac-sha256"] as string;
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET || "";
  const body = JSON.stringify(req.body);
  const hash = crypto
    .createHmac("sha256", secret)
    .update(body, "utf8")
    .digest("base64");

  if (hmac !== hash) {
    return res.status(401).json({ error: "Invalid webhook signature" });
  }

  try {
    const order = req.body;
    const customerEmail = order.email;
    const orderId = order.id?.toString();
    const totalPrice = parseFloat(order.total_price || "0");
    const currency = order.currency || "IDR";

    // Record purchase event in RDS
    await db.insert(events).values({
      eventType: "checkout_complete",
      properties: {
        orderId,
        orderName: order.name,
        itemCount: order.line_items?.length ?? 0,
        lineItems: order.line_items?.map((item: any) => ({
          productId: item.product_id?.toString(),
          variantId: item.variant_id?.toString(),
          title: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
      },
      revenue: totalPrice.toString(),
      currency,
      shopifyOrderId: orderId,
    });

    // Trigger n8n WhatsApp confirmation workflow (async)
    triggerN8nOrderConfirmation({
      orderId,
      customerEmail,
      customerName: `${order.billing_address?.first_name ?? ""} ${order.billing_address?.last_name ?? ""}`.trim(),
      orderTotal: totalPrice,
      currency,
      lineItems: order.line_items ?? [],
    }).catch((err) => console.error("[Webhook] n8n trigger failed:", err));

    res.json({ success: true });
  } catch (error) {
    console.error("[Webhook] Shopify order error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
});

// ─── n8n INBOUND WEBHOOK ──────────────────────────────────────────────────────
// n8n calls this to push aggregated data back to RDS

webhooksRouter.post("/n8n/kpi-sync", async (req: Request, res: Response) => {
  const secret = req.headers["x-n8n-secret"];
  if (secret !== process.env.N8N_WEBHOOK_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { date, adSpend, roas } = req.body;
    // Update ad spend and ROAS in daily aggregate (sourced from Meta/TikTok via n8n)
    await db
      .update(require("../db/schema/index.js").kpiDailyAggregates)
      .set({
        adSpend: adSpend?.toString(),
        roas: roas?.toString(),
        updatedAt: new Date(),
      })
      .where(require("drizzle-orm").eq(
        require("../db/schema/index.js").kpiDailyAggregates.date,
        date
      ));

    res.json({ success: true });
  } catch (error) {
    console.error("[Webhook] n8n KPI sync error:", error);
    res.status(500).json({ error: "KPI sync failed" });
  }
});

// ─── TRIGGER n8n WORKFLOW ─────────────────────────────────────────────────────

async function triggerN8nOrderConfirmation(payload: {
  orderId: string;
  customerEmail: string;
  customerName: string;
  orderTotal: number;
  currency: string;
  lineItems: any[];
}) {
  const n8nWebhookUrl = process.env.N8N_ORDER_WEBHOOK_URL;
  if (!n8nWebhookUrl) {
    console.warn("[Webhook] N8N_ORDER_WEBHOOK_URL not set — skipping WhatsApp trigger");
    return;
  }

  await fetch(n8nWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-n8n-secret": process.env.N8N_WEBHOOK_SECRET || "",
    },
    body: JSON.stringify(payload),
  });
}
