import { Router } from "express";
import { z } from "zod";
import { db } from "../db/index.js";
import { users } from "../db/schema/index.js";
import { eq } from "drizzle-orm";

export const usersRouter = Router();

const registerSchema = z.object({
  email: z.string().email(),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  shopifyCustomerId: z.string().optional(),
  preferredLocale: z.enum(["id", "en"]).default("id"),
  acquisitionSource: z.string().optional(),
  acquisitionMedium: z.string().optional(),
  acquisitionCampaign: z.string().optional(),
});

// POST /api/users/register — called after Shopify customer creation
usersRouter.post("/register", async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);

    const [user] = await db
      .insert(users)
      .values(data)
      .onConflictDoUpdate({
        target: users.email,
        set: {
          shopifyCustomerId: data.shopifyCustomerId,
          firstName: data.firstName,
          lastName: data.lastName,
          updatedAt: new Date(),
          lastLoginAt: new Date(),
        },
      })
      .returning({ id: users.id, email: users.email, role: users.role });

    res.json({ success: true, user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation failed", details: error.errors });
    }
    console.error("[Users] Register error:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// GET /api/users/profile/:email
usersRouter.get("/profile/:email", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        role: users.role,
        preferredLocale: users.preferredLocale,
        isVetPartner: users.isVetPartner,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("[Users] Profile error:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});
