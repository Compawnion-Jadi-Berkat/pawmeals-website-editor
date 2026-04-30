import { Router } from "express";
import { z } from "zod";
import { db } from "../db/index.js";
import { events, userSessions } from "../db/schema/index.js";
import { eq } from "drizzle-orm";

export const eventsRouter = Router();

const trackEventSchema = z.object({
  sessionToken: z.string().min(1),
  anonymousId: z.string().optional(),
  eventType: z.enum([
    "page_view", "product_view", "quiz_start", "quiz_complete",
    "add_to_cart", "remove_from_cart", "checkout_start", "checkout_complete",
    "subscription_created", "subscription_paused", "subscription_cancelled",
    "newsletter_signup", "vet_content_view",
  ]),
  properties: z.record(z.unknown()).optional(),
  pagePath: z.string().optional(),
  pageTitle: z.string().optional(),
  locale: z.enum(["id", "en"]).default("id"),
  revenue: z.number().optional(),
  currency: z.string().length(3).default("IDR"),
  shopifyOrderId: z.string().optional(),
  shopifyProductId: z.string().optional(),
  shopifyVariantId: z.string().optional(),
});

// POST /api/events/track
eventsRouter.post("/track", async (req, res) => {
  try {
    const data = trackEventSchema.parse(req.body);

    // Resolve session
    const [session] = await db
      .select({ id: userSessions.id, userId: userSessions.userId })
      .from(userSessions)
      .where(eq(userSessions.sessionToken, data.sessionToken))
      .limit(1);

    await db.insert(events).values({
      sessionId: session?.id ?? null,
      userId: session?.userId ?? null,
      anonymousId: data.anonymousId,
      eventType: data.eventType,
      properties: data.properties ?? {},
      pagePath: data.pagePath,
      pageTitle: data.pageTitle,
      locale: data.locale,
      revenue: data.revenue?.toString(),
      currency: data.currency,
      shopifyOrderId: data.shopifyOrderId,
      shopifyProductId: data.shopifyProductId,
      shopifyVariantId: data.shopifyVariantId,
    });

    res.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation failed", details: error.errors });
    }
    console.error("[Events] Track error:", error);
    res.status(500).json({ error: "Failed to track event" });
  }
});

// POST /api/events/session — create or refresh a session
const sessionSchema = z.object({
  anonymousId: z.string().min(1),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
  referrer: z.string().optional(),
  landingPage: z.string().optional(),
  locale: z.enum(["id", "en"]).default("id"),
  deviceType: z.enum(["mobile", "tablet", "desktop"]).optional(),
});

eventsRouter.post("/session", async (req, res) => {
  try {
    const data = sessionSchema.parse(req.body);
    const { nanoid } = await import("nanoid");
    const sessionToken = nanoid(64);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    const [session] = await db
      .insert(userSessions)
      .values({
        sessionToken,
        anonymousId: data.anonymousId,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        utmContent: data.utmContent,
        utmTerm: data.utmTerm,
        referrer: data.referrer,
        landingPage: data.landingPage,
        locale: data.locale,
        deviceType: data.deviceType,
        ipAddress: req.ip,
        expiresAt,
      })
      .returning({ id: userSessions.id, sessionToken: userSessions.sessionToken });

    res.json({ sessionToken: session.sessionToken, expiresAt });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation failed", details: error.errors });
    }
    console.error("[Events] Session error:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
});
