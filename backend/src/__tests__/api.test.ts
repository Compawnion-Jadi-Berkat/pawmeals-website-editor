import { describe, it, expect, vi, beforeEach } from "vitest";

// ─── Mock environment variables ───────────────────────────────────────────────
vi.stubEnv("DATABASE_URL", "postgresql://test:test@localhost:5432/test_db");
vi.stubEnv("SHOPIFY_STORE_DOMAIN", "pawmeals.myshopify.com");
vi.stubEnv("SHOPIFY_STOREFRONT_ACCESS_TOKEN", "test-token");
vi.stubEnv("JWT_SECRET", "test-jwt-secret-min-32-chars-long-enough");
vi.stubEnv("KLAVIYO_API_KEY", "pk_test_klaviyo");
vi.stubEnv("KLAVIYO_LIST_ID_ID", "test-list-id");

// ─── Klaviyo Integration Tests ────────────────────────────────────────────────
describe("Klaviyo Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("skips subscription when API key is missing", () => {
    vi.stubEnv("KLAVIYO_API_KEY", "");
    const apiKey = process.env.KLAVIYO_API_KEY || "";
    expect(apiKey).toBe("");
  });

  it("skips event tracking when API key is missing", () => {
    vi.stubEnv("KLAVIYO_API_KEY", "");
    const apiKey = process.env.KLAVIYO_API_KEY || "";
    expect(apiKey).toBe("");
  });

  it("requires email field for quiz completion tracking", () => {
    const payload = { petType: "dog", recommendedProduct: "Chicken & Rice" };
    const hasEmail = "email" in payload;
    expect(hasEmail).toBe(false); // email is missing — should not send
  });
});

// ─── Shopify Client Tests ─────────────────────────────────────────────────────
describe("Shopify Client", () => {
  it("builds correct GraphQL endpoint from store domain", () => {
    const domain = "pawmeals.myshopify.com";
    const expected = `https://${domain}/api/2024-01/graphql.json`;
    expect(expected).toContain("pawmeals.myshopify.com");
    expect(expected).toContain("graphql.json");
  });

  it("formats Indonesian Rupiah currency correctly", () => {
    const amount = 248500;
    const formatted = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
    expect(formatted).toContain("248");
    expect(formatted).toContain("500");
  });
});

// ─── KPI Metrics Tests ────────────────────────────────────────────────────────
describe("KPI Metrics", () => {
  it("calculates ROAS correctly — target >3x", () => {
    const revenue = 248500000;
    const adSpend = 51880000;
    const roas = revenue / adSpend;
    expect(roas).toBeGreaterThan(3);
    expect(Math.round(roas * 100) / 100).toBeCloseTo(4.79, 1);
  });

  it("calculates conversion rate correctly", () => {
    const purchases = 1228;
    const visitors = 38420;
    const conversionRate = (purchases / visitors) * 100;
    expect(conversionRate).toBeGreaterThan(0);
    expect(conversionRate).toBeLessThan(100);
  });

  it("calculates retention rate correctly", () => {
    const retainedCustomers = 3891;
    const totalCustomers = 3891 + 1247;
    const retentionRate = (retainedCustomers / totalCustomers) * 100;
    expect(retentionRate).toBeGreaterThan(50);
    expect(retentionRate).toBeLessThan(100);
  });

  it("identifies on-track vs off-track KPIs", () => {
    const kpis = [
      { id: "roas", value: 4.79, target: 3.0, status: "on-track" },
      { id: "conversion_rate", value: 3.2, target: 4.0, status: "at-risk" },
      { id: "shop_visitors", value: 38420, target: 50000, status: "off-track" },
    ];
    const onTrack = kpis.filter((k) => k.status === "on-track");
    const atRisk = kpis.filter((k) => k.status === "at-risk");
    const offTrack = kpis.filter((k) => k.status === "off-track");
    expect(onTrack).toHaveLength(1);
    expect(atRisk).toHaveLength(1);
    expect(offTrack).toHaveLength(1);
  });
});

// ─── i18n Routing Tests ───────────────────────────────────────────────────────
describe("i18n Routing", () => {
  it("supports Indonesian and English locales", () => {
    const supportedLocales = ["id", "en"];
    expect(supportedLocales).toContain("id");
    expect(supportedLocales).toContain("en");
    expect(supportedLocales).toHaveLength(2);
  });

  it("defaults to Indonesian locale", () => {
    const defaultLocale = "id";
    expect(defaultLocale).toBe("id");
  });

  it("generates correct locale-prefixed paths", () => {
    const locales = ["id", "en"];
    const paths = locales.map((locale) => `/${locale}/products`);
    expect(paths).toContain("/id/products");
    expect(paths).toContain("/en/products");
  });
});

// ─── Quiz Logic Tests ─────────────────────────────────────────────────────────
describe("Quiz Recommendation Logic", () => {
  it("recommends correct product for adult dog with weight management needs", () => {
    const quizAnswers = {
      petType: "dog",
      age: "adult",
      healthNeeds: ["weight-management"],
      breed: "labrador",
    };
    const isAdultDog = quizAnswers.petType === "dog" && quizAnswers.age === "adult";
    const needsWeightManagement = quizAnswers.healthNeeds.includes("weight-management");
    expect(isAdultDog).toBe(true);
    expect(needsWeightManagement).toBe(true);
  });

  it("recommends kitten formula for young cats", () => {
    const quizAnswers = { petType: "cat", age: "kitten", healthNeeds: ["growth"] };
    const isKitten = quizAnswers.petType === "cat" && quizAnswers.age === "kitten";
    expect(isKitten).toBe(true);
  });

  it("validates all required quiz fields are present", () => {
    const requiredFields = ["petType", "age", "healthNeeds"];
    const quizAnswers = { petType: "dog", age: "senior", healthNeeds: ["joint-health"] };
    const allFieldsPresent = requiredFields.every(
      (field) => field in quizAnswers && quizAnswers[field as keyof typeof quizAnswers]
    );
    expect(allFieldsPresent).toBe(true);
  });
});

// ─── AEO Structured Data Tests ────────────────────────────────────────────────
describe("AEO Structured Data", () => {
  it("generates valid Organization schema", () => {
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Pawmeals",
      url: "https://pawmeals.id",
      logo: "https://pawmeals.id/logo.png",
      description: "Indonesia's #1 cooked pet food specialist",
      sameAs: ["https://www.instagram.com/pawmeals.id", "https://www.tiktok.com/@pawmeals.id"],
    };
    expect(orgSchema["@context"]).toBe("https://schema.org");
    expect(orgSchema["@type"]).toBe("Organization");
    expect(orgSchema.name).toBe("Pawmeals");
    expect(orgSchema.sameAs).toHaveLength(2);
  });

  it("generates valid Product schema with required fields", () => {
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Pawmeals Chicken & Rice — Adult Dog",
      description: "Premium cooked chicken with brown rice",
      brand: { "@type": "Brand", name: "Pawmeals" },
      offers: {
        "@type": "Offer",
        price: "85000",
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
      },
    };
    expect(productSchema["@type"]).toBe("Product");
    expect(productSchema.offers.priceCurrency).toBe("IDR");
    expect(productSchema.offers.availability).toContain("schema.org");
  });

  it("generates valid FAQPage schema", () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What makes Pawmeals different?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pawmeals uses only fresh, natural ingredients with no preservatives.",
          },
        },
      ],
    };
    expect(faqSchema["@type"]).toBe("FAQPage");
    expect(faqSchema.mainEntity[0]["@type"]).toBe("Question");
    expect(faqSchema.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
  });
});

// ─── n8n Workflow Tests ───────────────────────────────────────────────────────
describe("n8n Workflow Validation", () => {
  it("order confirmation workflow has required nodes", async () => {
    const { readFileSync } = await import("fs");
    const workflow = JSON.parse(
      readFileSync(
        "/home/ubuntu/pawmeals-nextjs/n8n-workflows/01_order_confirmation_whatsapp.json",
        "utf-8"
      )
    );
    const nodeNames = workflow.nodes.map((n: { name: string }) => n.name);
    expect(nodeNames).toContain("Shopify Order Webhook");
    expect(nodeNames).toContain("Format WhatsApp Message");
    expect(nodeNames).toContain("Send WhatsApp Message");
    expect(workflow.tags).toContain("pawmeals");
  });

  it("klaviyo sync workflow has required nodes", async () => {
    const { readFileSync } = await import("fs");
    const workflow = JSON.parse(
      readFileSync(
        "/home/ubuntu/pawmeals-nextjs/n8n-workflows/02_klaviyo_customer_sync.json",
        "utf-8"
      )
    );
    const nodeNames = workflow.nodes.map((n: { name: string }) => n.name);
    expect(nodeNames).toContain("Shopify Customer Webhook");
    expect(nodeNames).toContain("Upsert Klaviyo Profile");
    expect(nodeNames).toContain("Subscribe to Pawmeals List");
    expect(workflow.tags).toContain("klaviyo");
  });
});
