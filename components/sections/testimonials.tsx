"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { testimonialItems } from "@/config/sections";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  // Duplicate items for seamless infinite loop
  const duplicatedItems = [...testimonialItems, ...testimonialItems];

  return (
    <section className="relative bg-soft-beige py-10 sm:py-14 lg:py-20 overflow-hidden shadow-[inset_0_8px_20px_-8px_rgba(45,41,38,0.08),inset_0_-8px_20px_-8px_rgba(45,41,38,0.08)]" id="testimonials">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-soft-beige to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-soft-beige to-transparent z-10 pointer-events-none" />

      {/* Scrolling container */}
      <div className="flex animate-scroll hover:pause-animation">
        {duplicatedItems.map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className="flex-shrink-0 w-[300px] sm:w-[360px] lg:w-[400px] px-3 sm:px-4"
          >
            {/* Testimonial Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl shadow-espresso/5 border-2 border-sand hover:border-tomato/30 transition-all duration-300 h-full">
              {/* Header: Quote icon and Rating */}
              <div className="flex items-start justify-between mb-4 sm:mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-tomato/10 flex items-center justify-center">
                  <Quote className="h-5 w-5 sm:h-6 sm:w-6 text-tomato" />
                </div>
                <div className="flex gap-0.5 sm:gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 sm:h-5 sm:w-5 fill-sunshine text-sunshine"
                    />
                  ))}
                </div>
              </div>

              {/* Testimonial Content */}
              <p className="text-coffee text-sm sm:text-base lg:text-lg leading-relaxed mb-5 sm:mb-6 line-clamp-4">
                "{t(`items.${testimonial.translationKey}.content`)}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div>
                  <p className="text-espresso font-bold text-sm sm:text-base">
                    {t(`items.${testimonial.translationKey}.name`)}
                  </p>
                  <p className="text-latte text-xs sm:text-sm">
                    {t(`items.${testimonial.translationKey}.source`)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
