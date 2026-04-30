CREATE TYPE "public"."device_type" AS ENUM('mobile', 'tablet', 'desktop');--> statement-breakpoint
CREATE TYPE "public"."event_type" AS ENUM('page_view', 'product_view', 'quiz_start', 'quiz_complete', 'add_to_cart', 'remove_from_cart', 'checkout_start', 'checkout_complete', 'subscription_created', 'subscription_paused', 'subscription_cancelled', 'newsletter_signup', 'vet_content_view');--> statement-breakpoint
CREATE TYPE "public"."locale" AS ENUM('id', 'en');--> statement-breakpoint
CREATE TYPE "public"."session_status" AS ENUM('active', 'expired', 'logged_out');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('customer', 'admin', 'vet_partner');--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer,
	"user_id" integer,
	"anonymous_id" varchar(64),
	"event_type" "event_type" NOT NULL,
	"properties" jsonb,
	"page_path" text,
	"page_title" varchar(300),
	"locale" "locale" DEFAULT 'id',
	"revenue" numeric(12, 2),
	"currency" varchar(3) DEFAULT 'IDR',
	"shopify_order_id" varchar(64),
	"shopify_product_id" varchar(64),
	"shopify_variant_id" varchar(64),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kpi_daily_aggregates" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" varchar(10) NOT NULL,
	"total_visitors" integer DEFAULT 0,
	"unique_visitors" integer DEFAULT 0,
	"new_visitors" integer DEFAULT 0,
	"returning_visitors" integer DEFAULT 0,
	"product_page_views" integer DEFAULT 0,
	"quiz_starts" integer DEFAULT 0,
	"quiz_completions" integer DEFAULT 0,
	"add_to_cart_count" integer DEFAULT 0,
	"checkout_starts" integer DEFAULT 0,
	"purchases" integer DEFAULT 0,
	"total_revenue" numeric(15, 2) DEFAULT '0',
	"average_order_value" numeric(12, 2) DEFAULT '0',
	"new_customers" integer DEFAULT 0,
	"returning_customers" integer DEFAULT 0,
	"active_subscriptions" integer DEFAULT 0,
	"new_subscriptions" integer DEFAULT 0,
	"cancelled_subscriptions" integer DEFAULT 0,
	"ad_spend" numeric(12, 2) DEFAULT '0',
	"roas" numeric(8, 4) DEFAULT '0',
	"conversion_rate" numeric(8, 6) DEFAULT '0',
	"cart_abandonment_rate" numeric(8, 6) DEFAULT '0',
	"computed_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"first_name" varchar(100),
	"pet_type" varchar(20),
	"source" varchar(100),
	"locale" "locale" DEFAULT 'id',
	"is_active" boolean DEFAULT true,
	"klaviyo_list_id" varchar(64),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "newsletter_subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "quiz_responses" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer,
	"user_id" integer,
	"pet_type" varchar(20),
	"pet_name" varchar(100),
	"pet_breed" varchar(100),
	"pet_age" varchar(20),
	"pet_weight" varchar(20),
	"health_concerns" jsonb,
	"feeding_preference" varchar(50),
	"recommended_products" jsonb,
	"added_to_cart" boolean DEFAULT false,
	"purchased" boolean DEFAULT false,
	"locale" "locale" DEFAULT 'id',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_token" varchar(128) NOT NULL,
	"user_id" integer,
	"anonymous_id" varchar(64),
	"status" "session_status" DEFAULT 'active' NOT NULL,
	"utm_source" varchar(100),
	"utm_medium" varchar(100),
	"utm_campaign" varchar(200),
	"utm_content" varchar(200),
	"utm_term" varchar(200),
	"referrer" text,
	"landing_page" text,
	"device_type" "device_type",
	"user_agent" text,
	"ip_address" varchar(45),
	"country" varchar(2),
	"city" varchar(100),
	"locale" "locale" DEFAULT 'id',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"last_activity_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_sessions_session_token_unique" UNIQUE("session_token")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"shopify_customer_id" varchar(64),
	"email" varchar(320) NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"phone" varchar(20),
	"role" "user_role" DEFAULT 'customer' NOT NULL,
	"preferred_locale" "locale" DEFAULT 'id',
	"is_email_verified" boolean DEFAULT false,
	"is_vet_partner" boolean DEFAULT false,
	"vet_clinic_name" varchar(200),
	"acquisition_source" varchar(100),
	"acquisition_medium" varchar(100),
	"acquisition_campaign" varchar(200),
	"klaviyo_profile_id" varchar(64),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_login_at" timestamp,
	CONSTRAINT "users_shopify_customer_id_unique" UNIQUE("shopify_customer_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_session_id_user_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."user_sessions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_responses" ADD CONSTRAINT "quiz_responses_session_id_user_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."user_sessions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_responses" ADD CONSTRAINT "quiz_responses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "events_session_idx" ON "events" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "events_user_idx" ON "events" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "events_type_idx" ON "events" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "events_created_idx" ON "events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "events_shopify_order_idx" ON "events" USING btree ("shopify_order_id");--> statement-breakpoint
CREATE UNIQUE INDEX "kpi_date_idx" ON "kpi_daily_aggregates" USING btree ("date");--> statement-breakpoint
CREATE UNIQUE INDEX "newsletter_email_idx" ON "newsletter_subscribers" USING btree ("email");--> statement-breakpoint
CREATE INDEX "quiz_session_idx" ON "quiz_responses" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "quiz_user_idx" ON "quiz_responses" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "quiz_pet_type_idx" ON "quiz_responses" USING btree ("pet_type");--> statement-breakpoint
CREATE UNIQUE INDEX "sessions_token_idx" ON "user_sessions" USING btree ("session_token");--> statement-breakpoint
CREATE INDEX "sessions_user_idx" ON "user_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sessions_anon_idx" ON "user_sessions" USING btree ("anonymous_id");--> statement-breakpoint
CREATE INDEX "sessions_status_idx" ON "user_sessions" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_shopify_idx" ON "users" USING btree ("shopify_customer_id");--> statement-breakpoint
CREATE INDEX "users_role_idx" ON "users" USING btree ("role");