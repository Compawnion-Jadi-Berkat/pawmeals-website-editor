"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Bone, Cat, Dog, Dumbbell, Leaf, Scale, ShieldCheck, Sparkles, Stethoscope, Trophy } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

interface ProductFiltersProps {
  locale: Locale;
  activeType?: string;
}

const iconMap = {
  all: Sparkles,
  dog: Dog,
  cat: Cat,
  puppy: Dog,
  kitten: Cat,
  senior: Trophy,
  wellness: ShieldCheck,
  joint: Bone,
  weight: Scale,
  sensitive: Leaf,
} as const;

export function ProductFilters({ locale, activeType }: ProductFiltersProps) {
  const router = useRouter();

  const categories = [
    { value: "", label: locale === "id" ? "Semua Produk" : "All Products", icon: "all" },
    { value: "dog", label: locale === "id" ? "Makanan Anjing" : "Dog Food", icon: "dog" },
    { value: "cat", label: locale === "id" ? "Makanan Kucing" : "Cat Food", icon: "cat" },
    { value: "puppy", label: locale === "id" ? "Anak Anjing" : "Puppy", icon: "puppy" },
    { value: "kitten", label: locale === "id" ? "Anak Kucing" : "Kitten", icon: "kitten" },
    { value: "senior", label: locale === "id" ? "Senior" : "Senior", icon: "senior" },
    { value: "wellness", label: locale === "id" ? "Kesehatan Umum" : "Wellness", icon: "wellness" },
    { value: "joint", label: locale === "id" ? "Kesehatan Sendi" : "Joint Health", icon: "joint" },
    { value: "weight", label: locale === "id" ? "Berat Badan" : "Weight Mgmt", icon: "weight" },
    { value: "sensitive", label: locale === "id" ? "Pencernaan Sensitif" : "Sensitive", icon: "sensitive" },
  ] as const;

  const handleFilter = (value: string) => {
    const params = new URLSearchParams();
    if (value) params.set("type", value);
    router.push(`/${locale}/products${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <aside className="luxury-panel rounded-3xl p-5 sticky top-24">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-pm-caramel/12 text-pm-caramel flex items-center justify-center">
          <Stethoscope className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-body-xs font-bold uppercase tracking-[0.2em] text-pm-caramel-dark">
            {locale === "id" ? "Kurasi" : "Curation"}
          </p>
          <h3 className="font-heading font-bold text-pm-brown">
            {locale === "id" ? "Filter Produk" : "Filter Products"}
          </h3>
        </div>
      </div>
      <div className="space-y-1.5">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon];
          const isActive = (activeType ?? "") === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => handleFilter(cat.value)}
              className={`w-full min-h-11 flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left text-body-sm transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-pm-brown text-white shadow-warm-md font-bold"
                  : "text-pm-brown hover:bg-white hover:shadow-warm-sm font-semibold"
              }`}
              aria-pressed={isActive}
            >
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? "bg-white/15" : "bg-pm-caramel/10 text-pm-caramel"}`}>
                <Icon className="w-4 h-4" aria-hidden="true" />
              </span>
              {cat.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
