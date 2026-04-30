import { Router } from "express";
import { z } from "zod";
import { db } from "../db/index.js";
import { kpiDailyAggregates, events, users } from "../db/schema/index.js";
import { eq, gte, lte, and, sql, count, sum } from "drizzle-orm";
import { verifyAdminToken } from "../middleware/auth.js";

export const kpiRouter = Router();

// All KPI routes require admin authentication
kpiRouter.use(verifyAdminToken);

// GET /api/kpi/dashboard?from=2026-01-01&to=2026-01-31
kpiRouter.get("/dashboard", async (req, res) => {
  try {
    const { from, to } = z.object({
      from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    }).parse(req.query);

    // Fetch pre-computed daily aggregates
    const dailyData = await db
      .select()
      .from(kpiDailyAggregates)
      .where(
        and(
          gte(kpiDailyAggregates.date, from),
          lte(kpiDailyAggregates.date, to)
        )
      )
      .orderBy(kpiDailyAggregates.date);

    // Compute period totals
    const totals = dailyData.reduce(
      (acc, row) => ({
        totalVisitors: acc.totalVisitors + (row.totalVisitors ?? 0),
        newVisitors: acc.newVisitors + (row.newVisitors ?? 0),
        returningVisitors: acc.returningVisitors + (row.returningVisitors ?? 0),
        productPageViews: acc.productPageViews + (row.productPageViews ?? 0),
        quizStarts: acc.quizStarts + (row.quizStarts ?? 0),
        quizCompletions: acc.quizCompletions + (row.quizCompletions ?? 0),
        addToCartCount: acc.addToCartCount + (row.addToCartCount ?? 0),
        purchases: acc.purchases + (row.purchases ?? 0),
        totalRevenue: acc.totalRevenue + parseFloat(row.totalRevenue?.toString() ?? "0"),
        newCustomers: acc.newCustomers + (row.newCustomers ?? 0),
        returningCustomers: acc.returningCustomers + (row.returningCustomers ?? 0),
        newSubscriptions: acc.newSubscriptions + (row.newSubscriptions ?? 0),
        cancelledSubscriptions: acc.cancelledSubscriptions + (row.cancelledSubscriptions ?? 0),
        adSpend: acc.adSpend + parseFloat(row.adSpend?.toString() ?? "0"),
      }),
      {
        totalVisitors: 0, newVisitors: 0, returningVisitors: 0,
        productPageViews: 0, quizStarts: 0, quizCompletions: 0,
        addToCartCount: 0, purchases: 0, totalRevenue: 0,
        newCustomers: 0, returningCustomers: 0, newSubscriptions: 0,
        cancelledSubscriptions: 0, adSpend: 0,
      }
    );

    // Compute derived KPIs
    const conversionRate = totals.totalVisitors > 0
      ? (totals.purchases / totals.totalVisitors) * 100
      : 0;
    const cartAbandonmentRate = totals.addToCartCount > 0
      ? ((totals.addToCartCount - totals.purchases) / totals.addToCartCount) * 100
      : 0;
    const averageOrderValue = totals.purchases > 0
      ? totals.totalRevenue / totals.purchases
      : 0;
    const roas = totals.adSpend > 0
      ? totals.totalRevenue / totals.adSpend
      : 0;
    const quizConversionRate = totals.quizStarts > 0
      ? (totals.quizCompletions / totals.quizStarts) * 100
      : 0;

    res.json({
      period: { from, to },
      totals,
      computed: {
        conversionRate: parseFloat(conversionRate.toFixed(2)),
        cartAbandonmentRate: parseFloat(cartAbandonmentRate.toFixed(2)),
        averageOrderValue: parseFloat(averageOrderValue.toFixed(0)),
        roas: parseFloat(roas.toFixed(2)),
        quizConversionRate: parseFloat(quizConversionRate.toFixed(2)),
      },
      daily: dailyData,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid date range", details: error.errors });
    }
    console.error("[KPI] Dashboard error:", error);
    res.status(500).json({ error: "Failed to fetch KPI data" });
  }
});

// POST /api/kpi/aggregate — triggered daily by n8n cron workflow
kpiRouter.post("/aggregate", async (req, res) => {
  try {
    const { date } = z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    }).parse(req.body);

    const startOfDay = new Date(`${date}T00:00:00.000Z`);
    const endOfDay = new Date(`${date}T23:59:59.999Z`);

    // Count events for the day
    const [visitorCount] = await db
      .select({ count: count() })
      .from(events)
      .where(
        and(
          eq(events.eventType, "page_view"),
          gte(events.createdAt, startOfDay),
          lte(events.createdAt, endOfDay)
        )
      );

    const [productViews] = await db
      .select({ count: count() })
      .from(events)
      .where(
        and(
          eq(events.eventType, "product_view"),
          gte(events.createdAt, startOfDay),
          lte(events.createdAt, endOfDay)
        )
      );

    const [addToCartCount] = await db
      .select({ count: count() })
      .from(events)
      .where(
        and(
          eq(events.eventType, "add_to_cart"),
          gte(events.createdAt, startOfDay),
          lte(events.createdAt, endOfDay)
        )
      );

    const [purchaseCount] = await db
      .select({ count: count() })
      .from(events)
      .where(
        and(
          eq(events.eventType, "checkout_complete"),
          gte(events.createdAt, startOfDay),
          lte(events.createdAt, endOfDay)
        )
      );

    const [revenueResult] = await db
      .select({ total: sum(events.revenue) })
      .from(events)
      .where(
        and(
          eq(events.eventType, "checkout_complete"),
          gte(events.createdAt, startOfDay),
          lte(events.createdAt, endOfDay)
        )
      );

    const [quizStarts] = await db
      .select({ count: count() })
      .from(events)
      .where(
        and(
          eq(events.eventType, "quiz_start"),
          gte(events.createdAt, startOfDay),
          lte(events.createdAt, endOfDay)
        )
      );

    const [quizCompletions] = await db
      .select({ count: count() })
      .from(events)
      .where(
        and(
          eq(events.eventType, "quiz_complete"),
          gte(events.createdAt, startOfDay),
          lte(events.createdAt, endOfDay)
        )
      );

    const [newCustomers] = await db
      .select({ count: count() })
      .from(users)
      .where(
        and(
          gte(users.createdAt, startOfDay),
          lte(users.createdAt, endOfDay)
        )
      );

    const purchases = purchaseCount.count;
    const totalRevenue = parseFloat(revenueResult.total?.toString() ?? "0");
    const aov = purchases > 0 ? totalRevenue / purchases : 0;
    const conversionRate = visitorCount.count > 0
      ? purchases / visitorCount.count
      : 0;

    // Upsert the daily aggregate
    await db
      .insert(kpiDailyAggregates)
      .values({
        date,
        totalVisitors: visitorCount.count,
        uniqueVisitors: visitorCount.count,
        newVisitors: newCustomers.count,
        productPageViews: productViews.count,
        quizStarts: quizStarts.count,
        quizCompletions: quizCompletions.count,
        addToCartCount: addToCartCount.count,
        purchases,
        totalRevenue: totalRevenue.toString(),
        averageOrderValue: aov.toFixed(2),
        newCustomers: newCustomers.count,
        conversionRate: conversionRate.toFixed(6),
        computedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: kpiDailyAggregates.date,
        set: {
          totalVisitors: visitorCount.count,
          productPageViews: productViews.count,
          quizStarts: quizStarts.count,
          quizCompletions: quizCompletions.count,
          addToCartCount: addToCartCount.count,
          purchases,
          totalRevenue: totalRevenue.toString(),
          averageOrderValue: aov.toFixed(2),
          newCustomers: newCustomers.count,
          conversionRate: conversionRate.toFixed(6),
          updatedAt: new Date(),
        },
      });

    res.json({ success: true, date, aggregated: true });
  } catch (error) {
    console.error("[KPI] Aggregate error:", error);
    res.status(500).json({ error: "Failed to aggregate KPI data" });
  }
});
