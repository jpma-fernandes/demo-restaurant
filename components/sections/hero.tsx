"use client";

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
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1920&q=80"
        >
          {/* Local video file */}
          <source src="/HeroVideo.mp4" type="video/mp4" />
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550547660-d9450f859349?w=1920&q=80')" }} />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/20 to-charcoal/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-white" />
            <span className="text-sm uppercase tracking-[0.3em] font-medium text-white">
              Est. 2019
            </span>
            <div className="h-px w-12 bg-white" />
          </div>

          {/* Main Title */}
          <h1 className="text-[130px] md:text-[160px] lg:text-[200px] font-fascinate text-smoke tracking-tight">
            Forja
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToMenu}
              className="text-smoke hover:bg-smoke hover:text-flame font-bold text-lg px-8 py-6 uppercase tracking-wide transition-all duration-300"
            >
              {t("cta")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToReservations}
              className=" text-smoke hover:bg-smoke hover:text-flame font-bold text-lg px-8 py-6 uppercase tracking-wide transition-all duration-300"
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
