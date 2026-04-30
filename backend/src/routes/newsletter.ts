import { Router } from "express";
import { z } from "zod";
import { db } from "../db/index.js";
import { newsletterSubscribers } from "../db/schema/index.js";

export const newsletterRouter = Router();

const subscribeSchema = z.object({
  email: z.string().email(),
  firstName: z.string().max(100).optional(),
  petType: z.enum(["dog", "cat", "both"]).optional(),
  source: z.string().max(100).default("website"),
  locale: z.enum(["id", "en"]).default("id"),
});

// POST /api/newsletter/subscribe
newsletterRouter.post("/subscribe", async (req, res) => {
  try {
    const data = subscribeSchema.parse(req.body);

    await db
      .insert(newsletterSubscribers)
      .values({
        email: data.email,
        firstName: data.firstName,
        petType: data.petType,
        source: data.source,
        locale: data.locale,
        isActive: true,
      })
      .onConflictDoUpdate({
        target: newsletterSubscribers.email,
        set: { isActive: true, updatedAt: new Date() } as any,
      });

    // Sync to Klaviyo (async — don't block response)
    syncToKlaviyo(data.email, data.firstName, data.locale).catch((err) =>
      console.error("[Newsletter] Klaviyo sync failed:", err)
    );

    res.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation failed", details: error.errors });
    }
    console.error("[Newsletter] Subscribe error:", error);
    res.status(500).json({ error: "Failed to subscribe" });
  }
});

async function syncToKlaviyo(email: string, firstName?: string, locale?: string) {
  const apiKey = process.env.KLAVIYO_API_KEY;
  if (!apiKey) return;

  const listId = locale === "en"
    ? process.env.KLAVIYO_LIST_ID_EN
    : process.env.KLAVIYO_LIST_ID_ID;

  if (!listId) return;

  await fetch(`https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/`, {
    method: "POST",
    headers: {
      "Authorization": `Klaviyo-API-Key ${apiKey}`,
      "Content-Type": "application/json",
      "revision": "2024-10-15",
    },
    body: JSON.stringify({
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          profiles: {
            data: [{
              type: "profile",
              attributes: {
                email,
                first_name: firstName,
                properties: { locale, source: "pawmeals_website" },
                subscriptions: {
                  email: { marketing: { consent: "SUBSCRIBED" } },
                },
              },
            }],
          },
          historical_import: false,
        },
        relationships: {
          list: { data: { type: "list", id: listId } },
        },
      },
    }),
  });
}
