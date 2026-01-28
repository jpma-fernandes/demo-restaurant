"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Flame } from "lucide-react";

const timelineYears = ["2019", "2020", "2022", "2025", "2026"] as const;

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section className="relative bg-cream py-16 lg:py-24" id="about">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-tomato/10 px-4 py-2 rounded-full mb-4">
            <Flame className="h-4 w-4 text-tomato" />
            <span className="text-tomato text-sm font-bold uppercase tracking-wider">
              {t("subtitle")}
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-espresso leading-tight mb-4">
            {t("title").split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-tomato">{t("title").split(" ").slice(-1)}</span>
          </h2>
          <p className="text-latte text-lg leading-relaxed max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Content: Image + Timeline */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Image */}
          <div className="relative w-full lg:w-2/5 h-[300px] sm:h-[400px] lg:h-auto lg:min-h-[600px] rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
            <Image
              src="/images/mid-burguer.jpg"
              alt="Artisan burger"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
          </div>

          {/* Timeline */}
          <div className="flex-1">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white to-tomato" />
              
              {/* Timeline items */}
              <div className="space-y-8">
                {timelineYears.map((year, index) => (
                  <div key={year} className="relative pl-12">
                    {/* Dot */}
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-cream border-4 border-tomato shadow-lg flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-tomato" />
                    </div>
                    
                    {/* Card */}
                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-sand/50">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl sm:text-3xl font-black text-tomato">
                          {year}
                        </span>
                        <div className="h-px flex-1 bg-sand" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-espresso mb-2">
                        {t(`timeline.${year}.title`)}
                      </h3>
                      
                      <p className="text-coffee text-sm sm:text-base leading-relaxed">
                        {t(`timeline.${year}.description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
