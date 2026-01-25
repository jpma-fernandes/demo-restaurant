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
    <footer className="bg-charcoal border-t border-gunmetal">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 text-smoke hover:text-ember transition-colors"
            >
              <Flame className="h-8 w-8 text-ember" />
              <span className="font-bold text-xl tracking-tight">
                FORGE BURGER
              </span>
            </Link>
            <p className="text-iron text-sm leading-relaxed">
              {t("description")}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-iron hover:text-ember transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-iron hover:text-ember transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-iron hover:text-ember transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-smoke font-semibold uppercase tracking-wide">
              {t("navigation")}
            </h3>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-iron hover:text-ember transition-colors text-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-smoke font-semibold uppercase tracking-wide">
              {t("legal")}
            </h3>
            <nav className="flex flex-col gap-2">
              <a
                href="#"
                className="text-iron hover:text-ember transition-colors text-sm"
              >
                {t("privacy")}
              </a>
              <a
                href="#"
                className="text-iron hover:text-ember transition-colors text-sm"
              >
                {t("terms")}
              </a>
              <a
                href="#"
                className="text-iron hover:text-ember transition-colors text-sm"
              >
                {t("cookies")}
              </a>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-smoke font-semibold uppercase tracking-wide">
              {t("newsletter.title")}
            </h3>
            <p className="text-iron text-sm">{t("newsletter.description")}</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="bg-steel border-gunmetal text-smoke placeholder:text-slate flex-1"
              />
              <Button
                type="submit"
                className="bg-ember hover:bg-rust text-charcoal font-semibold"
              >
                {t("newsletter.submit")}
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gunmetal text-center">
          <p className="text-slate text-sm">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
