"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Flame, Instagram, Facebook, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useSectionConfig } from "@/hooks/use-section-config";

export function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const { getEnabledSections } = useSectionConfig();

  const enabledSections = getEnabledSections();
  const currentYear = new Date().getFullYear();

  // Build navigation items based on enabled sections
  const navItems = enabledSections
    .filter((section) => section.id !== "hero")
    .map((section) => ({
      id: section.id,
      label: tCommon(section.id),
      href: `#${section.id}`,
    }));

  return (
    <footer className="bg-espresso border-t border-coffee">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 text-cream hover:text-tomato transition-colors"
            >
              <Flame className="h-8 w-8 text-tomato" />
              <span className="font-bold text-xl tracking-tight">
                FORGE BURGER
              </span>
            </Link>
            <p className="text-latte text-sm leading-relaxed">
              {t("description")}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-coffee/50 flex items-center justify-center text-latte hover:bg-tomato hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-coffee/50 flex items-center justify-center text-latte hover:bg-tomato hover:text-white transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-coffee/50 flex items-center justify-center text-latte hover:bg-tomato hover:text-white transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-cream font-bold uppercase tracking-wide text-sm">
              {t("navigation")}
            </h3>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-latte hover:text-tomato transition-colors text-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-cream font-bold uppercase tracking-wide text-sm">
              {t("legal")}
            </h3>
            <nav className="flex flex-col gap-2">
              <a
                href="#"
                className="text-latte hover:text-tomato transition-colors text-sm"
              >
                {t("privacy")}
              </a>
              <a
                href="#"
                className="text-latte hover:text-tomato transition-colors text-sm"
              >
                {t("terms")}
              </a>
              <a
                href="#"
                className="text-latte hover:text-tomato transition-colors text-sm"
              >
                {t("cookies")}
              </a>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-cream font-bold uppercase tracking-wide text-sm">
              {t("newsletter.title")}
            </h3>
            <p className="text-latte text-sm">{t("newsletter.description")}</p>
            <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="bg-coffee/50 border-coffee text-cream placeholder:text-cappuccino focus:border-tomato flex-1"
              />
              <Button
                type="submit"
                className="bg-tomato hover:bg-tomato-dark text-white font-semibold w-full sm:w-auto shadow-lg shadow-tomato/20"
              >
                {t("newsletter.submit")}
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-coffee text-center">
          <p className="text-cappuccino text-xs sm:text-sm">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
