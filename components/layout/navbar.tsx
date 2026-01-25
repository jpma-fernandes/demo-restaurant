"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Settings, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useSectionConfig } from "@/hooks/use-section-config";

interface NavbarProps {
  onConfigOpen: () => void;
}

export function Navbar({ onConfigOpen }: NavbarProps) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getEnabledSections } = useSectionConfig();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar when scrolled past the hero section (viewport height)
      // Using a slightly smaller value (0.9) to make it appear just before the next section
      const showThreshold = window.innerHeight * 0.9;
      setIsScrolled(window.scrollY > showThreshold);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const enabledSections = getEnabledSections();

  // Build navigation items based on enabled sections
  const navItems = enabledSections
    .filter((section) => section.id !== "hero") // Don't show hero in nav
    .map((section) => ({
      id: section.id,
      label: t(`common.${section.id}`),
      href: `#${section.id}`,
    }));

  // Get the other locale for switching
  const otherLocale = locale === "pt" ? "en" : "pt";
  const localePathname = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-sm border-b border-gunmetal transition-transform duration-300 ease-in-out",
        isScrolled ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-smoke hover:text-ember transition-colors"
        >
          <Flame className="h-8 w-8 text-ember" />
          <span className="font-bold text-xl tracking-wider">Forja</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-iron hover:text-ember transition-colors text-sm font-medium uppercase tracking-wide"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <Link
            href={localePathname}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-iron hover:text-smoke hover:bg-gunmetal transition-colors"
          >
            <span
              className={cn(
                "uppercase",
                locale === "pt" ? "text-ember font-bold" : ""
              )}
            >
              PT
            </span>
            <span className="text-gunmetal">|</span>
            <span
              className={cn(
                "uppercase",
                locale === "en" ? "text-ember font-bold" : ""
              )}
            >
              EN
            </span>
          </Link>

          {/* Config Panel Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onConfigOpen}
            className="text-iron hover:text-ember hover:bg-gunmetal"
            title={t("nav.configPanel")}
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">{t("nav.configPanel")}</span>
          </Button>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-iron hover:text-ember hover:bg-gunmetal"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t("nav.openMenu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-steel border-gunmetal"
            >
              <SheetTitle className="text-smoke flex items-center gap-2 mb-8">
                <Flame className="h-6 w-6 text-ember" />
                <span>FORGE BURGER</span>
              </SheetTitle>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-iron hover:text-ember transition-colors text-lg font-medium uppercase tracking-wide py-2 border-b border-gunmetal"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
