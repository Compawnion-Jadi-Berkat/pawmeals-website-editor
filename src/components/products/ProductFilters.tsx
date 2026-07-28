"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Bone, Cat, Dog, Dumbbell, Leaf, Scale, ShieldCheck, Sparkles, Stethoscope, Trophy } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { ProductCategoryContent } from "@/types/site-content";

interface ProductFiltersProps {
  locale: Locale;
  activeType?: string;
  categories: ProductCategoryContent[];
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

type IconKey = keyof typeof iconMap;

function resolveIcon(icon?: string): IconKey {
  if (icon && icon in iconMap) return icon as IconKey;
  return "all";
}

export function ProductFilters({ locale, activeType, categories }: ProductFiltersProps) {
  const router = useRouter();

  const filterItems = [
    { value: "", label: locale === "id" ? "Semua Produk" : "All Products", icon: "all" as IconKey, iconImageUrl: undefined as string | undefined },
    ...categories.map((category) => ({
      value: category.slug,
      label: category.title,
      icon: resolveIcon(category.icon),
      iconImageUrl: category.iconImage?.asset?.url as string | undefined,
    })),
  ];

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
        {filterItems.map((cat) => {
          const Icon = iconMap[cat.icon];
          const isActive = (activeType ?? "") === cat.value;
          const custom = cat.iconImageUrl;
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
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden ${isActive ? "bg-white/15" : "bg-pm-caramel/10 text-pm-caramel"}`}>
                {custom ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={custom} alt="" className="w-5 h-5 object-contain" />
                ) : (
                  <Icon className="w-4 h-4" aria-hidden="true" />
                )}
              </span>
              {cat.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
