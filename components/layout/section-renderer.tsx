"use client";

import { useSectionConfig } from "@/hooks/use-section-config";
import { HeroSection } from "@/components/sections/hero";
import { MenuSection } from "@/components/sections/menu";
import { AboutSection } from "@/components/sections/about";
import { EventsSection } from "@/components/sections/events";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { ReservationsSection } from "@/components/sections/reservations";
import { ContactSection } from "@/components/sections/contact";
import { ComponentType } from "react";

// Map section IDs to their components
const sectionComponents: Record<string, ComponentType> = {
  hero: HeroSection,
  menu: MenuSection,
  about: AboutSection,
  events: EventsSection,
  testimonials: TestimonialsSection,
  reservations: ReservationsSection,
  contact: ContactSection,
};

export function SectionRenderer() {
  const { getEnabledSections } = useSectionConfig();
  const enabledSections = getEnabledSections();

  return (
    <main className="min-h-screen">
      {enabledSections.map((section) => {
        const Component = sectionComponents[section.id];
        if (!Component) return null;

        return (
          <section
            key={section.id}
            id={section.id}
            className="section-enter"
          >
            <Component />
          </section>
        );
      })}
    </main>
  );
}
