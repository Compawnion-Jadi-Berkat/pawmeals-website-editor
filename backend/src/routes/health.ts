import { Router } from "express";
import { pool } from "../db/index.js";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      status: "ok",
      service: "pawmeals-api",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch {
    res.status(503).json({
      status: "degraded",
      service: "pawmeals-api",
      database: "disconnected",
      timestamp: new Date().toISOString(),
    });
  }
});
