"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";

interface ProductFiltersProps {
  locale: Locale;
  activeType?: string;
}

export function ProductFilters({ locale, activeType }: ProductFiltersProps) {
  const router = useRouter();

  const categories = [
    { value: "", label: locale === "id" ? "Semua Produk" : "All Products", emoji: "🐾" },
    { value: "dog", label: locale === "id" ? "Makanan Anjing" : "Dog Food", emoji: "🐕" },
    { value: "cat", label: locale === "id" ? "Makanan Kucing" : "Cat Food", emoji: "🐈" },
    { value: "puppy", label: locale === "id" ? "Anak Anjing" : "Puppy", emoji: "🐣" },
    { value: "kitten", label: locale === "id" ? "Anak Kucing" : "Kitten", emoji: "🐱" },
    { value: "senior", label: locale === "id" ? "Senior" : "Senior", emoji: "🌟" },
    { value: "wellness", label: locale === "id" ? "Kesehatan Umum" : "Wellness", emoji: "💪" },
    { value: "joint", label: locale === "id" ? "Kesehatan Sendi" : "Joint Health", emoji: "🦴" },
    { value: "weight", label: locale === "id" ? "Berat Badan" : "Weight Mgmt", emoji: "⚖️" },
    { value: "sensitive", label: locale === "id" ? "Pencernaan Sensitif" : "Sensitive", emoji: "🌿" },
  ];

  const handleFilter = (value: string) => {
    const params = new URLSearchParams();
    if (value) params.set("type", value);
    router.push(`/${locale}/products${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-pm-sand/40 p-5">
      <h3 className="font-heading font-bold text-pm-brown mb-4">
        {locale === "id" ? "Filter Produk" : "Filter Products"}
      </h3>
      <div className="space-y-1">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleFilter(cat.value)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-body-sm transition-colors ${
              (activeType ?? "") === cat.value
                ? "bg-pm-caramel text-white font-bold"
                : "text-pm-brown hover:bg-pm-cream font-medium"
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
