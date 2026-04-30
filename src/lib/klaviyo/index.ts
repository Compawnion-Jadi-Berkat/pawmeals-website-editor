/**
 * Klaviyo Integration — Server-side only
 * Used in Next.js Route Handlers and EC2 backend API
 */

const KLAVIYO_API_URL = "https://a.klaviyo.com/api";
const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY;

interface KlaviyoProfile {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  properties?: Record<string, unknown>;
}

interface KlaviyoEvent {
  email: string;
  eventName: string;
  properties?: Record<string, unknown>;
  value?: number;
}

// ─── Subscribe to List ────────────────────────────────────────────────────────
export async function subscribeToList(
  profile: KlaviyoProfile,
  listId: string = process.env.KLAVIYO_LIST_ID ?? ""
): Promise<boolean> {
  if (!KLAVIYO_API_KEY) {
    console.warn("[Klaviyo] KLAVIYO_PRIVATE_API_KEY not set — skipping");
    return false;
  }

  try {
    const res = await fetch(`${KLAVIYO_API_URL}/profile-subscription-bulk-create-jobs/`, {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        "Content-Type": "application/json",
        revision: "2024-02-15",
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            list_id: listId,
            subscriptions: [
              {
                channels: {
                  email: ["MARKETING"],
                },
                profile: {
                  data: {
                    type: "profile",
                    attributes: {
                      email: profile.email,
                      first_name: profile.firstName,
                      last_name: profile.lastName,
                      phone_number: profile.phone,
                      properties: profile.properties ?? {},
                    },
                  },
                },
              },
            ],
          },
        },
      }),
    });

    return res.ok;
  } catch (err) {
    console.error("[Klaviyo] subscribeToList error:", err);
    return false;
  }
}

// ─── Track Event ──────────────────────────────────────────────────────────────
export async function trackEvent(event: KlaviyoEvent): Promise<boolean> {
  if (!KLAVIYO_API_KEY) {
    console.warn("[Klaviyo] KLAVIYO_PRIVATE_API_KEY not set — skipping");
    return false;
  }

  try {
    const res = await fetch(`${KLAVIYO_API_URL}/events/`, {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        "Content-Type": "application/json",
        revision: "2024-02-15",
      },
      body: JSON.stringify({
        data: {
          type: "event",
          attributes: {
            metric: {
              data: {
                type: "metric",
                attributes: { name: event.eventName },
              },
            },
            profile: {
              data: {
                type: "profile",
                attributes: { email: event.email },
              },
            },
            properties: event.properties ?? {},
            value: event.value,
            time: new Date().toISOString(),
          },
        },
      }),
    });

    return res.ok;
  } catch (err) {
    console.error("[Klaviyo] trackEvent error:", err);
    return false;
  }
}

// ─── Convenience: Track Order Placed ─────────────────────────────────────────
export async function trackOrderPlaced(params: {
  email: string;
  orderId: string;
  total: number;
  currency: string;
  items: { id: string; name: string; price: number; quantity: number }[];
}) {
  return trackEvent({
    email: params.email,
    eventName: "Placed Order",
    value: params.total,
    properties: {
      order_id: params.orderId,
      total: params.total,
      currency: params.currency,
      items: params.items,
    },
  });
}

// ─── Convenience: Track Quiz Completed ───────────────────────────────────────
export async function trackQuizCompleted(params: {
  email?: string;
  petType: string;
  petName?: string;
  recommendedProduct: string;
}) {
  if (!params.email) return false;
  return trackEvent({
    email: params.email,
    eventName: "Quiz Completed",
    properties: {
      pet_type: params.petType,
      pet_name: params.petName,
      recommended_product: params.recommendedProduct,
    },
  });
}

// ─── Convenience: Track Newsletter Signup ────────────────────────────────────
export async function trackNewsletterSignup(email: string, source: string = "website") {
  return subscribeToList({ email, properties: { source } });
}
