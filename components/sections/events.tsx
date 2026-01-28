"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { eventItems } from "@/config/sections";
import { Calendar, Sparkles, ArrowRight } from "lucide-react";

export function EventsSection() {
  const t = useTranslations("events");

  return (
    <section className="bg-cream-dark py-16 sm:py-20 lg:py-28" id="events">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-sunshine/20 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-mustard" />
            <span className="text-mustard text-xs sm:text-sm font-bold uppercase tracking-wider">
              {t("subtitle")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-espresso mb-4">
            {t("title").split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-tomato">{t("title").split(" ").slice(-1)}</span>
          </h2>
          <p className="text-latte text-base sm:text-lg">{t("description")}</p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {eventItems.map((event, index) => (
            <div
              key={event.id}
              className={`group relative bg-white rounded-2xl overflow-hidden border-2 border-sand hover:border-tomato/30 transition-all duration-300 shadow-lg shadow-espresso/5 hover:shadow-xl hover:shadow-tomato/10 ${
                event.featured ? "md:col-span-2" : ""
              }`}
            >
              <div
                className={`flex flex-col ${
                  event.featured ? "md:flex-row" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${
                    event.featured
                      ? "h-56 sm:h-64 md:h-auto md:w-1/2"
                      : "h-48 sm:h-56"
                  }`}
                >
                  <Image
                    src={event.image}
                    alt={t(`items.${event.translationKey}.name`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-espresso/20 to-transparent" />

                  {/* Featured badge */}
                  {event.featured && (
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-sunshine text-espresso text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      <Sparkles className="h-3 w-3" />
                      <span className="uppercase tracking-wide">Destaque</span>
                    </div>
                  )}

                  {/* Date badge on image */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm text-espresso px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                    <Calendar className="h-4 w-4 text-tomato" />
                    <span>{t(`items.${event.translationKey}.date`)}</span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`p-5 sm:p-6 lg:p-8 flex flex-col justify-center ${
                    event.featured ? "md:w-1/2" : ""
                  }`}
                >
                  <h3 className="text-espresso font-bold text-xl sm:text-2xl mb-3 group-hover:text-tomato transition-colors">
                    {t(`items.${event.translationKey}.name`)}
                  </h3>
                  <p className="text-latte text-sm sm:text-base leading-relaxed mb-4">
                    {t(`items.${event.translationKey}.description`)}
                  </p>
                  
                  {/* CTA Link */}
                  <div className="flex items-center gap-2 text-tomato font-semibold text-sm group/link cursor-pointer w-fit">
                    <span>Saiba mais</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
