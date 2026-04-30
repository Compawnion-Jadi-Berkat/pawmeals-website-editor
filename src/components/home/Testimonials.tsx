"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

interface Testimonial {
  customerName: string;
  petName: string;
  petBreed: string;
  review: string;
  rating: number;
  photo?: { asset: { url: string } };
  productName?: string;
}

interface TestimonialsProps {
  locale: Locale;
  testimonials: Testimonial[] | null;
}

const defaultTestimonials = (locale: Locale): Testimonial[] => [
  {
    customerName: "Rina S.",
    petName: "Mochi",
    petBreed: locale === "id" ? "Shih Tzu, 3 tahun" : "Shih Tzu, 3 years",
    review: locale === "id"
      ? "Sejak pakai Pawmeals, bulu Mochi jadi lebih berkilau dan dia jauh lebih aktif. Tidak ada lagi masalah pencernaan yang biasa dia alami. Sangat rekomendasikan!"
      : "Since using Pawmeals, Mochi's coat has become shinier and she's much more active. No more digestive issues she used to have. Highly recommend!",
    rating: 5,
    productName: "Pawmeals Daily Wellness",
  },
  {
    customerName: "Budi H.",
    petName: "Rex",
    petBreed: locale === "id" ? "Golden Retriever, 5 tahun" : "Golden Retriever, 5 years",
    review: locale === "id"
      ? "Rex punya masalah sendi dan dokter hewan kami merekomendasikan Pawmeals Joint Care. Hasilnya luar biasa — dia sekarang bisa berlari lagi seperti dulu."
      : "Rex has joint issues and our vet recommended Pawmeals Joint Care. The results are amazing — he can run again like he used to.",
    rating: 5,
    productName: "Pawmeals Joint Care",
  },
  {
    customerName: "Sari W.",
    petName: "Luna",
    petBreed: locale === "id" ? "Domestic Cat, 2 tahun" : "Domestic Cat, 2 years",
    review: locale === "id"
      ? "Luna sangat pemilih soal makanan, tapi dia langsung suka Pawmeals Cat! Senang sekali akhirnya menemukan makanan yang dia mau makan dengan lahap."
      : "Luna is very picky about food, but she immediately loved Pawmeals Cat! So happy to finally find food she eats enthusiastically.",
    rating: 5,
    productName: "Pawmeals Cat Classic",
  },
  {
    customerName: "Dian P.",
    petName: "Buddy",
    petBreed: locale === "id" ? "Pomeranian, 1 tahun" : "Pomeranian, 1 year",
    review: locale === "id"
      ? "Sistem langganan Pawmeals sangat memudahkan. Makanan datang tepat waktu setiap bulan dan Buddy selalu excited saat paketnya tiba!"
      : "The Pawmeals subscription system is so convenient. Food arrives on time every month and Buddy is always excited when the package arrives!",
    rating: 5,
    productName: "Pawmeals Puppy Growth",
  },
  {
    customerName: "Ahmad F.",
    petName: "Kopi",
    petBreed: locale === "id" ? "Kucing Persia, 4 tahun" : "Persian Cat, 4 years",
    review: locale === "id"
      ? "Kopi punya bulu panjang yang butuh nutrisi ekstra. Pawmeals Cat Hairball Formula benar-benar membantu mengurangi masalah hairball-nya."
      : "Kopi has long fur that needs extra nutrition. Pawmeals Cat Hairball Formula really helped reduce his hairball issues.",
    rating: 5,
    productName: "Pawmeals Cat Hairball",
  },
];

export function Testimonials({ locale, testimonials }: TestimonialsProps) {
  const displayTestimonials = testimonials?.length ? testimonials : defaultTestimonials(locale);
  const [current, setCurrent] = useState(0);
  const itemsPerPage = 3;
  const maxPage = Math.ceil(displayTestimonials.length / itemsPerPage) - 1;

  const visible = displayTestimonials.slice(
    current * itemsPerPage,
    current * itemsPerPage + itemsPerPage
  );

  return (
    <section className="section-padding bg-white" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-pm-caramel font-bold text-label-md uppercase tracking-widest mb-3">
            {locale === "id" ? "Cerita Pelanggan" : "Customer Stories"}
          </p>
          <h2
            id="testimonials-heading"
            className="font-heading text-3xl sm:text-4xl font-bold text-pm-brown mb-4"
          >
            {locale === "id"
              ? "Hewan Peliharaan Bahagia, Pemilik Bahagia"
              : "Happy Pets, Happy Owners"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visible.map((t, index) => (
            <div
              key={index}
              className="bg-pm-cream rounded-2xl p-6 hover:shadow-warm-md transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-pm-caramel text-pm-caramel" />
                ))}
              </div>

              {/* Review */}
              <blockquote className="text-pm-brown/80 text-body-sm leading-relaxed mb-4 italic">
                &ldquo;{t.review}&rdquo;
              </blockquote>

              {/* Product tag */}
              {t.productName && (
                <div className="inline-block bg-pm-caramel/10 text-pm-caramel-dark text-body-xs font-semibold px-3 py-1 rounded-pill mb-4">
                  {t.productName}
                </div>
              )}

              {/* Customer */}
              <div className="flex items-center gap-3 pt-4 border-t border-pm-sand/50">
                {t.photo?.asset?.url ? (
                  <Image
                    src={t.photo.asset.url}
                    alt={t.customerName}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-pm-caramel/20 flex items-center justify-center text-lg">
                    🐾
                  </div>
                )}
                <div>
                  <p className="font-bold text-pm-brown text-body-sm">{t.customerName}</p>
                  <p className="text-pm-brown/60 text-body-xs">
                    {locale === "id" ? "Pemilik" : "Owner of"} {t.petName} · {t.petBreed}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {maxPage > 0 && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrent((p) => Math.max(0, p - 1))}
              disabled={current === 0}
              className="w-10 h-10 rounded-full border border-pm-sand flex items-center justify-center text-pm-brown hover:border-pm-caramel hover:text-pm-caramel disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: maxPage + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current ? "bg-pm-caramel w-6" : "bg-pm-sand hover:bg-pm-caramel/50"
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
            <button
              onClick={() => setCurrent((p) => Math.min(maxPage, p + 1))}
              disabled={current === maxPage}
              className="w-10 h-10 rounded-full border border-pm-sand flex items-center justify-center text-pm-brown hover:border-pm-caramel hover:text-pm-caramel disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
