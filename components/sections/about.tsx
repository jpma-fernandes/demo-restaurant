"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Award, Hammer, Leaf } from "lucide-react";

export function AboutSection() {
  const t = useTranslations("about");

  const values = [
    {
      icon: Award,
      title: t("values.quality"),
      description: t("values.qualityDesc"),
    },
    {
      icon: Hammer,
      title: t("values.craft"),
      description: t("values.craftDesc"),
    },
    {
      icon: Leaf,
      title: t("values.sustainable"),
      description: t("values.sustainableDesc"),
    },
  ];

  return (
    <div className="bg-charcoal py-16 sm:py-20 lg:py-32" id="about">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="h-px w-8 sm:w-12 bg-ember" />
            <span className="text-ember text-xs sm:text-sm uppercase tracking-[0.2em] font-medium">
              {t("subtitle")}
            </span>
            <div className="h-px w-8 sm:w-12 bg-ember" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-smoke mb-3 sm:mb-4">
            {t("title")}
          </h2>
          <p className="text-iron text-base sm:text-lg">{t("description")}</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-20">
          {/* Image */}
          <div className="relative h-[280px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80"
              alt="Restaurant interior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
          </div>

          {/* Story & Mission */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-ember text-xs sm:text-sm uppercase tracking-[0.2em] font-medium">
                {t("story.title")}
              </h3>
              <p className="text-smoke text-base sm:text-lg leading-relaxed">
                {t("story.content")}
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-ember text-xs sm:text-sm uppercase tracking-[0.2em] font-medium">
                {t("mission.title")}
              </h3>
              <p className="text-iron text-base sm:text-lg leading-relaxed">
                {t("mission.content")}
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="border-t border-gunmetal pt-10 sm:pt-16">
          <h3 className="text-center text-smoke text-xl sm:text-2xl font-bold mb-8 sm:mb-12">
            {t("values.title")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-4 sm:p-6 rounded-lg bg-steel/50 border border-gunmetal hover:border-ember transition-colors"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-ember/10 text-ember mb-3 sm:mb-4">
                  <value.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <h4 className="text-smoke font-bold text-lg sm:text-xl mb-2">
                  {value.title}
                </h4>
                <p className="text-iron text-sm sm:text-base">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
