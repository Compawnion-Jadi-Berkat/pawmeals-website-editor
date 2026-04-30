"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  locale: Locale;
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-pm-sand/60 rounded-2xl overflow-hidden bg-white hover:border-pm-caramel/40 transition-colors"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            aria-expanded={openIndex === index}
          >
            <span className="font-heading font-bold text-pm-brown text-body-lg leading-snug">
              {faq.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-pm-caramel flex-shrink-0 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-6 pb-5">
              <div className="h-px bg-pm-sand/50 mb-4" />
              <p className="text-pm-brown/80 text-body-md leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
