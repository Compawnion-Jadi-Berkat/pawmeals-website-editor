import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

// Route imports
import { eventsRouter } from "./routes/events.js";
import { usersRouter } from "./routes/users.js";
import { kpiRouter } from "./routes/kpi.js";
import { quizRouter } from "./routes/quiz.js";
import { newsletterRouter } from "./routes/newsletter.js";
import { webhooksRouter } from "./routes/webhooks.js";
import { healthRouter } from "./routes/health.js";

const app = express();
const PORT = process.env.PORT || 3001;

// ─── SECURITY MIDDLEWARE ──────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "https://pawmeals.com",
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
      "http://localhost:3000", // local dev
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-pawmeals-session"],
  })
);

// ─── RATE LIMITING ────────────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

const eventLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // 60 events per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── BODY PARSING ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// ─── LOGGING ──────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.use("/health", healthRouter);
app.use("/api/events", eventLimiter, eventsRouter);
app.use("/api/users", apiLimiter, usersRouter);
app.use("/api/kpi", apiLimiter, kpiRouter);
app.use("/api/quiz", apiLimiter, quizRouter);
app.use("/api/newsletter", apiLimiter, newsletterRouter);
app.use("/api/webhooks", webhooksRouter); // Shopify + n8n webhooks (no rate limit)

// ─── 404 HANDLER ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ─── ERROR HANDLER ────────────────────────────────────────────────────────────
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("[Error]", err.message, err.stack);
  res.status(500).json({
    error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
});

// ─── START ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[Pawmeals API] Running on port ${PORT} — ENV: ${process.env.NODE_ENV}`);
});

export default app;
