"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { eventItems } from "@/config/sections";
import { Calendar } from "lucide-react";

export function EventsSection() {
  const t = useTranslations("events");

  return (
    <div className="bg-steel py-20 lg:py-32">
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

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventItems.map((event) => (
            <Card
              key={event.id}
              className={`bg-charcoal border-gunmetal overflow-hidden group hover:border-ember transition-all duration-300 ${
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
                      ? "h-64 md:h-auto md:w-1/2"
                      : "h-48"
                  }`}
                >
                  <Image
                    src={event.image}
                    alt={t(`items.${event.translationKey}.name`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />

                  {event.featured && (
                    <div className="absolute top-3 left-3 bg-ember text-charcoal text-xs font-bold px-3 py-1 rounded uppercase">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <CardContent
                  className={`p-6 flex flex-col justify-center ${
                    event.featured ? "md:w-1/2" : ""
                  }`}
                >
                  <h3 className="text-smoke font-bold text-2xl mb-3 group-hover:text-ember transition-colors">
                    {t(`items.${event.translationKey}.name`)}
                  </h3>
                  <p className="text-iron text-base leading-relaxed mb-4">
                    {t(`items.${event.translationKey}.description`)}
                  </p>
                  <div className="flex items-center gap-2 text-ember">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {t(`items.${event.translationKey}.date`)}
                    </span>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
