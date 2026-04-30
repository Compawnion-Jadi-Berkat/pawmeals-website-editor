"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

interface NewsletterSignupProps {
  locale: Locale;
}

export function NewsletterSignup({ locale }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const t = {
    heading: locale === "id" ? "Dapatkan Tips & Promo Eksklusif" : "Get Exclusive Tips & Promos",
    subheading: locale === "id"
      ? "Bergabunglah dengan 15.000+ pemilik hewan peliharaan yang mendapatkan tips perawatan, resep, dan penawaran eksklusif langsung di inbox mereka."
      : "Join 15,000+ pet owners who get care tips, recipes, and exclusive offers delivered to their inbox.",
    placeholder: locale === "id" ? "Masukkan email kamu" : "Enter your email",
    cta: locale === "id" ? "Daftar Sekarang" : "Subscribe Now",
    success: locale === "id"
      ? "Terima kasih! Kamu sudah terdaftar. Cek inbox kamu untuk konfirmasi."
      : "Thank you! You're subscribed. Check your inbox for confirmation.",
    privacy: locale === "id"
      ? "Kami tidak akan pernah mengirim spam. Berhenti berlangganan kapan saja."
      : "We'll never spam you. Unsubscribe at any time.",
    perks: locale === "id"
      ? ["Tips nutrisi mingguan", "Promo eksklusif subscriber", "Update produk terbaru", "Konten edukasi vet"]
      : ["Weekly nutrition tips", "Exclusive subscriber promos", "Latest product updates", "Vet education content"],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg(locale === "id" ? "Masukkan email yang valid." : "Please enter a valid email.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/newsletter/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, locale }),
        }
      );

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        throw new Error("Subscription failed");
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        locale === "id"
          ? "Terjadi kesalahan. Silakan coba lagi."
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section
      className="section-padding bg-pm-brown relative overflow-hidden"
      aria-labelledby="newsletter-heading"
    >
      {/* Decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-20 top-0 w-80 h-80 rounded-full bg-pm-caramel/10 blur-3xl" />
        <div className="absolute -left-10 bottom-0 w-60 h-60 rounded-full bg-pm-caramel/5 blur-2xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pm-caramel/20 mb-6">
            <Mail className="w-7 h-7 text-pm-caramel" />
          </div>

          <h2
            id="newsletter-heading"
            className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            {t.heading}
          </h2>
          <p className="text-white/70 text-body-lg mb-8">{t.subheading}</p>

          {/* Perks */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {t.perks.map((perk) => (
              <div
                key={perk}
                className="flex items-center gap-1.5 bg-white/10 text-white/85 text-body-sm font-medium px-3 py-1.5 rounded-pill"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-pm-caramel" />
                {perk}
              </div>
            ))}
          </div>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-3 bg-pm-sage/20 text-pm-sage-light border border-pm-sage/30 rounded-2xl px-6 py-4">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <p className="font-semibold">{t.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-pm-caramel focus:bg-white/15 transition-all"
                  required
                  aria-label={t.placeholder}
                />
                {errorMsg && (
                  <p className="text-red-400 text-body-xs mt-1.5 text-left">{errorMsg}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 bg-pm-caramel text-white font-bold px-6 py-3.5 rounded-xl hover:bg-pm-caramel-dark transition-colors disabled:opacity-70 flex-shrink-0"
              >
                {status === "loading" ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {t.cta}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-white/40 text-body-xs mt-4">{t.privacy}</p>
        </div>
      </div>
    </section>
  );
}
