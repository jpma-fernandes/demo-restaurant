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

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80"
              alt="Restaurant interior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
          </div>

          {/* Story & Mission */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-ember text-sm uppercase tracking-[0.2em] font-medium">
                {t("story.title")}
              </h3>
              <p className="text-smoke text-lg leading-relaxed">
                {t("story.content")}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-ember text-sm uppercase tracking-[0.2em] font-medium">
                {t("mission.title")}
              </h3>
              <p className="text-iron text-lg leading-relaxed">
                {t("mission.content")}
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="border-t border-gunmetal pt-16">
          <h3 className="text-center text-smoke text-2xl font-bold mb-12">
            {t("values.title")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-steel/50 border border-gunmetal hover:border-ember transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ember/10 text-ember mb-4">
                  <value.icon className="h-8 w-8" />
                </div>
                <h4 className="text-smoke font-bold text-xl mb-2">
                  {value.title}
                </h4>
                <p className="text-iron">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
