"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("hero");

  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToReservations = () => {
    const reservationsSection = document.getElementById("reservations");
    if (reservationsSection) {
      reservationsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1920&q=80"
          alt="Artisan burger"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-ember" />
            <span className="text-ember text-sm uppercase tracking-[0.3em] font-medium">
              Est. 2019
            </span>
            <div className="h-px w-12 bg-ember" />
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-smoke tracking-tight">
            {t("title")}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-ember font-medium tracking-wide">
            {t("subtitle")}
          </p>

          {/* Description */}
          <p className="text-iron text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              size="lg"
              onClick={scrollToMenu}
              className="bg-ember hover:bg-rust text-charcoal font-bold text-lg px-8 py-6 uppercase tracking-wide transition-all duration-300 hover:scale-105"
            >
              {t("cta")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToReservations}
              className="border-smoke text-smoke hover:bg-smoke hover:text-charcoal font-bold text-lg px-8 py-6 uppercase tracking-wide transition-all duration-300"
            >
              {t("ctaSecondary")}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToMenu}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-iron hover:text-ember transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </div>
  );
}
