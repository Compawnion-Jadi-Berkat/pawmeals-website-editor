import { Router } from "express";
import { z } from "zod";
import { db } from "../db/index.js";
import { quizResponses, userSessions } from "../db/schema/index.js";
import { eq } from "drizzle-orm";

export const quizRouter = Router();

const quizSubmitSchema = z.object({
  sessionToken: z.string().min(1),
  petType: z.enum(["dog", "cat"]),
  petName: z.string().max(100).optional(),
  petBreed: z.string().max(100).optional(),
  petAge: z.string().max(20),
  petWeight: z.string().max(20).optional(),
  healthConcerns: z.array(z.string()).default([]),
  feedingPreference: z.string().max(50).optional(),
  recommendedProducts: z.array(z.string()).default([]),
  locale: z.enum(["id", "en"]).default("id"),
});

// POST /api/quiz/submit
quizRouter.post("/submit", async (req, res) => {
  try {
    const data = quizSubmitSchema.parse(req.body);

    const [session] = await db
      .select({ id: userSessions.id, userId: userSessions.userId })
      .from(userSessions)
      .where(eq(userSessions.sessionToken, data.sessionToken))
      .limit(1);

    const [response] = await db
      .insert(quizResponses)
      .values({
        sessionId: session?.id ?? null,
        userId: session?.userId ?? null,
        petType: data.petType,
        petName: data.petName,
        petBreed: data.petBreed,
        petAge: data.petAge,
        petWeight: data.petWeight,
        healthConcerns: data.healthConcerns,
        feedingPreference: data.feedingPreference,
        recommendedProducts: data.recommendedProducts,
        locale: data.locale,
      })
      .returning({ id: quizResponses.id });

    res.json({ success: true, quizResponseId: response.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation failed", details: error.errors });
    }
    console.error("[Quiz] Submit error:", error);
    res.status(500).json({ error: "Failed to save quiz response" });
  }
});
