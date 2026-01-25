"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { testimonialItems } from "@/config/sections";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <div className="bg-charcoal py-20 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-ember" />
            <span className="text-ember text-sm uppercase tracking-[0.2em] font-medium">
              {t("subtitle")}
            </span>
            <div className="h-px w-12 bg-ember" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-smoke mb-4">
            {t("title")}
          </h2>
          <p className="text-iron text-lg">{t("description")}</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonialItems.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-steel border-gunmetal hover:border-ember transition-all duration-300"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-ember/30 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-ember text-ember"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-smoke text-lg leading-relaxed mb-6 italic">
                  "{t(`items.${testimonial.translationKey}.content`)}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={t(`items.${testimonial.translationKey}.name`)}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-smoke font-semibold">
                      {t(`items.${testimonial.translationKey}.name`)}
                    </p>
                    <p className="text-iron text-sm">
                      {t(`items.${testimonial.translationKey}.role`)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
