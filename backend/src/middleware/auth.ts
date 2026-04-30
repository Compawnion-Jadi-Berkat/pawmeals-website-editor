import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";

export interface AuthRequest extends Request {
  adminId?: string;
}

export function verifyAdminToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { adminId: string; role: string };
    if (payload.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.adminId = payload.adminId;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function generateAdminToken(adminId: string): string {
  return jwt.sign({ adminId, role: "admin" }, JWT_SECRET, { expiresIn: "8h" });
}
