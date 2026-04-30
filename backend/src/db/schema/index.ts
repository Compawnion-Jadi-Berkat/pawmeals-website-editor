import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  jsonb,
  index,
  uniqueIndex,
  pgEnum,
} from "drizzle-orm/pg-core";

// ─── ENUMS ────────────────────────────────────────────────────────────────────

export const userRoleEnum = pgEnum("user_role", ["customer", "admin", "vet_partner"]);
export const sessionStatusEnum = pgEnum("session_status", ["active", "expired", "logged_out"]);
export const eventTypeEnum = pgEnum("event_type", [
  "page_view",
  "product_view",
  "quiz_start",
  "quiz_complete",
  "add_to_cart",
  "remove_from_cart",
  "checkout_start",
  "checkout_complete",
  "subscription_created",
  "subscription_paused",
  "subscription_cancelled",
  "newsletter_signup",
  "vet_content_view",
]);
export const deviceTypeEnum = pgEnum("device_type", ["mobile", "tablet", "desktop"]);
export const localeEnum = pgEnum("locale", ["id", "en"]);

// ─── USERS ────────────────────────────────────────────────────────────────────

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    shopifyCustomerId: varchar("shopify_customer_id", { length: 64 }).unique(),
    email: varchar("email", { length: 320 }).notNull().unique(),
    firstName: varchar("first_name", { length: 100 }),
    lastName: varchar("last_name", { length: 100 }),
    phone: varchar("phone", { length: 20 }),
    role: userRoleEnum("role").default("customer").notNull(),
    preferredLocale: localeEnum("preferred_locale").default("id"),
    isEmailVerified: boolean("is_email_verified").default(false),
    isVetPartner: boolean("is_vet_partner").default(false),
    vetClinicName: varchar("vet_clinic_name", { length: 200 }),
    // UTM attribution at registration
    acquisitionSource: varchar("acquisition_source", { length: 100 }),
    acquisitionMedium: varchar("acquisition_medium", { length: 100 }),
    acquisitionCampaign: varchar("acquisition_campaign", { length: 200 }),
    // Klaviyo sync
    klaviyoProfileId: varchar("klaviyo_profile_id", { length: 64 }),
    // Metadata
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    lastLoginAt: timestamp("last_login_at"),
  },
  (table) => ({
    emailIdx: uniqueIndex("users_email_idx").on(table.email),
    shopifyIdx: index("users_shopify_idx").on(table.shopifyCustomerId),
    roleIdx: index("users_role_idx").on(table.role),
  })
);

// ─── USER SESSIONS ────────────────────────────────────────────────────────────

export const userSessions = pgTable(
  "user_sessions",
  {
    id: serial("id").primaryKey(),
    sessionToken: varchar("session_token", { length: 128 }).notNull().unique(),
    userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
    // Anonymous sessions (pre-login)
    anonymousId: varchar("anonymous_id", { length: 64 }),
    status: sessionStatusEnum("status").default("active").notNull(),
    // Attribution
    utmSource: varchar("utm_source", { length: 100 }),
    utmMedium: varchar("utm_medium", { length: 100 }),
    utmCampaign: varchar("utm_campaign", { length: 200 }),
    utmContent: varchar("utm_content", { length: 200 }),
    utmTerm: varchar("utm_term", { length: 200 }),
    referrer: text("referrer"),
    landingPage: text("landing_page"),
    // Device
    deviceType: deviceTypeEnum("device_type"),
    userAgent: text("user_agent"),
    ipAddress: varchar("ip_address", { length: 45 }),
    country: varchar("country", { length: 2 }),
    city: varchar("city", { length: 100 }),
    // Locale
    locale: localeEnum("locale").default("id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    lastActivityAt: timestamp("last_activity_at").defaultNow().notNull(),
  },
  (table) => ({
    tokenIdx: uniqueIndex("sessions_token_idx").on(table.sessionToken),
    userIdx: index("sessions_user_idx").on(table.userId),
    anonIdx: index("sessions_anon_idx").on(table.anonymousId),
    statusIdx: index("sessions_status_idx").on(table.status),
  })
);

// ─── BEHAVIOURAL EVENTS ───────────────────────────────────────────────────────

export const events = pgTable(
  "events",
  {
    id: serial("id").primaryKey(),
    sessionId: integer("session_id").references(() => userSessions.id, { onDelete: "set null" }),
    userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
    anonymousId: varchar("anonymous_id", { length: 64 }),
    eventType: eventTypeEnum("event_type").notNull(),
    // Flexible payload — stores product IDs, quiz answers, cart values, etc.
    properties: jsonb("properties"),
    // Page context
    pagePath: text("page_path"),
    pageTitle: varchar("page_title", { length: 300 }),
    locale: localeEnum("locale").default("id"),
    // Revenue events
    revenue: decimal("revenue", { precision: 12, scale: 2 }),
    currency: varchar("currency", { length: 3 }).default("IDR"),
    // Shopify references
    shopifyOrderId: varchar("shopify_order_id", { length: 64 }),
    shopifyProductId: varchar("shopify_product_id", { length: 64 }),
    shopifyVariantId: varchar("shopify_variant_id", { length: 64 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    sessionIdx: index("events_session_idx").on(table.sessionId),
    userIdx: index("events_user_idx").on(table.userId),
    typeIdx: index("events_type_idx").on(table.eventType),
    createdIdx: index("events_created_idx").on(table.createdAt),
    shopifyOrderIdx: index("events_shopify_order_idx").on(table.shopifyOrderId),
  })
);

// ─── QUIZ RESPONSES ───────────────────────────────────────────────────────────

export const quizResponses = pgTable(
  "quiz_responses",
  {
    id: serial("id").primaryKey(),
    sessionId: integer("session_id").references(() => userSessions.id, { onDelete: "set null" }),
    userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
    // Quiz answers stored as structured JSON
    petType: varchar("pet_type", { length: 20 }), // dog | cat
    petName: varchar("pet_name", { length: 100 }),
    petBreed: varchar("pet_breed", { length: 100 }),
    petAge: varchar("pet_age", { length: 20 }),
    petWeight: varchar("pet_weight", { length: 20 }),
    healthConcerns: jsonb("health_concerns"), // array of concern strings
    feedingPreference: varchar("feeding_preference", { length: 50 }),
    // Recommended products
    recommendedProducts: jsonb("recommended_products"), // array of Shopify product IDs
    // Conversion tracking
    addedToCart: boolean("added_to_cart").default(false),
    purchased: boolean("purchased").default(false),
    locale: localeEnum("locale").default("id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    sessionIdx: index("quiz_session_idx").on(table.sessionId),
    userIdx: index("quiz_user_idx").on(table.userId),
    petTypeIdx: index("quiz_pet_type_idx").on(table.petType),
  })
);

// ─── KPI DAILY AGGREGATES ─────────────────────────────────────────────────────
// Pre-computed daily rollups for fast dashboard queries

export const kpiDailyAggregates = pgTable(
  "kpi_daily_aggregates",
  {
    id: serial("id").primaryKey(),
    date: varchar("date", { length: 10 }).notNull(), // YYYY-MM-DD
    // Traffic
    totalVisitors: integer("total_visitors").default(0),
    uniqueVisitors: integer("unique_visitors").default(0),
    newVisitors: integer("new_visitors").default(0),
    returningVisitors: integer("returning_visitors").default(0),
    // Engagement
    productPageViews: integer("product_page_views").default(0),
    quizStarts: integer("quiz_starts").default(0),
    quizCompletions: integer("quiz_completions").default(0),
    // E-commerce funnel
    addToCartCount: integer("add_to_cart_count").default(0),
    checkoutStarts: integer("checkout_starts").default(0),
    purchases: integer("purchases").default(0),
    // Revenue (IDR)
    totalRevenue: decimal("total_revenue", { precision: 15, scale: 2 }).default("0"),
    averageOrderValue: decimal("average_order_value", { precision: 12, scale: 2 }).default("0"),
    // Customers
    newCustomers: integer("new_customers").default(0),
    returningCustomers: integer("returning_customers").default(0),
    // Subscriptions
    activeSubscriptions: integer("active_subscriptions").default(0),
    newSubscriptions: integer("new_subscriptions").default(0),
    cancelledSubscriptions: integer("cancelled_subscriptions").default(0),
    // Marketing
    adSpend: decimal("ad_spend", { precision: 12, scale: 2 }).default("0"),
    roas: decimal("roas", { precision: 8, scale: 4 }).default("0"),
    // Computed rates
    conversionRate: decimal("conversion_rate", { precision: 8, scale: 6 }).default("0"),
    cartAbandonmentRate: decimal("cart_abandonment_rate", { precision: 8, scale: 6 }).default("0"),
    // Meta
    computedAt: timestamp("computed_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    dateIdx: uniqueIndex("kpi_date_idx").on(table.date),
  })
);

// ─── NEWSLETTER SUBSCRIBERS ───────────────────────────────────────────────────

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 320 }).notNull().unique(),
    firstName: varchar("first_name", { length: 100 }),
    petType: varchar("pet_type", { length: 20 }),
    source: varchar("source", { length: 100 }), // homepage_popup | quiz_result | checkout | footer
    locale: localeEnum("locale").default("id"),
    isActive: boolean("is_active").default(true),
    klaviyoListId: varchar("klaviyo_list_id", { length: 64 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex("newsletter_email_idx").on(table.email),
  })
);

// ─── TYPE EXPORTS ─────────────────────────────────────────────────────────────

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type UserSession = typeof userSessions.$inferSelect;
export type InsertUserSession = typeof userSessions.$inferInsert;
export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;
export type QuizResponse = typeof quizResponses.$inferSelect;
export type InsertQuizResponse = typeof quizResponses.$inferInsert;
export type KpiDailyAggregate = typeof kpiDailyAggregates.$inferSelect;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
