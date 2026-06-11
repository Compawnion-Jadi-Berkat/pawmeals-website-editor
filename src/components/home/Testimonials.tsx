"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  customerName: string;
  petName?: string;
  petBreed?: string;
  review: string;
  rating: number;
  photo?: { asset: { url: string } };
  productName?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[] | null;
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);
  if (!testimonials?.length) return null;

  const itemsPerPage = 3;
  const maxPage = Math.ceil(testimonials.length / itemsPerPage) - 1;
  const visible = testimonials.slice(current * itemsPerPage, current * itemsPerPage + itemsPerPage);

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visible.map((testimonial, index) => (
            <article key={`${testimonial.customerName}-${index}`} className="bg-pm-cream rounded-2xl p-6 hover:shadow-warm-md transition-shadow duration-300">
              {testimonial.rating > 0 && (
                <div className="flex gap-0.5 mb-4" aria-label={`${testimonial.rating} star rating`}>
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="w-4 h-4 fill-pm-caramel text-pm-caramel" />
                  ))}
                </div>
              )}
              <blockquote className="text-pm-brown/80 text-body-sm leading-relaxed mb-4 italic">&ldquo;{testimonial.review}&rdquo;</blockquote>
              {testimonial.productName && <div className="inline-block bg-pm-caramel/10 text-pm-caramel-dark text-body-xs font-semibold px-3 py-1 rounded-pill mb-4">{testimonial.productName}</div>}
              <div className="flex items-center gap-3 pt-4 border-t border-pm-sand/50">
                {testimonial.photo?.asset?.url && (
                  <Image src={testimonial.photo.asset.url} alt={testimonial.customerName} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                )}
                <div>
                  <p className="font-bold text-pm-brown text-body-sm">{testimonial.customerName}</p>
                  {[testimonial.petName, testimonial.petBreed].filter(Boolean).join(" · ") && (
                    <p className="text-pm-brown/60 text-body-xs">{[testimonial.petName, testimonial.petBreed].filter(Boolean).join(" · ")}</p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {maxPage > 0 && (
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => setCurrent((page) => Math.max(0, page - 1))} disabled={current === 0} className="w-10 h-10 rounded-full border border-pm-sand flex items-center justify-center text-pm-brown hover:border-pm-caramel hover:text-pm-caramel disabled:opacity-40 disabled:cursor-not-allowed transition-colors" aria-label="Previous testimonials">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: maxPage + 1 }).map((_, index) => (
              <button key={index} onClick={() => setCurrent(index)} className={`w-2.5 h-2.5 rounded-full transition-all ${index === current ? "bg-pm-caramel w-6" : "bg-pm-sand hover:bg-pm-caramel/50"}`} aria-label={`Page ${index + 1}`} />
            ))}
            <button onClick={() => setCurrent((page) => Math.min(maxPage, page + 1))} disabled={current === maxPage} className="w-10 h-10 rounded-full border border-pm-sand flex items-center justify-center text-pm-brown hover:border-pm-caramel hover:text-pm-caramel disabled:opacity-40 disabled:cursor-not-allowed transition-colors" aria-label="Next testimonials">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
