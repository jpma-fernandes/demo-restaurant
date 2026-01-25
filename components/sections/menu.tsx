"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { menuItems } from "@/config/sections";
import {
  Flame,
  Leaf,
  Award,
  Zap,
  LayoutGrid,
  List,
  Wheat,
  Milk,
  Egg,
  Wine,
  Nut,
  Sparkles,
} from "lucide-react";
import { MenuCategory, Allergen } from "@/types";

const categories: MenuCategory[] = ["burgers", "drinks", "sides", "milkshakes"];

export function MenuSection() {
  const t = useTranslations("menu");
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("burgers");
  const [viewMode, setViewMode] = useState<"picture" | "minimalist">("picture");

  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  const getTagIcon = (tag: string) => {
    switch (tag) {
      case "popular":
        return <Flame className="h-3 w-3" />;
      case "vegetarian":
        return <Leaf className="h-3 w-3" />;
      case "premium":
      case "signature":
        return <Award className="h-3 w-3" />;
      case "spicy":
        return <Zap className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getTagLabel = (tag: string) => {
    const labels: Record<string, string> = {
      popular: "Popular",
      vegetarian: "Vegetariano",
      premium: "Premium",
      signature: "Signature",
      spicy: "Picante",
      bestseller: "Bestseller",
    };
    return labels[tag] || tag;
  };

  const getAllergenIcon = (allergen: Allergen) => {
    switch (allergen) {
      case "gluten":
        return <Wheat className="h-3.5 w-3.5" />;
      case "dairy":
        return <Milk className="h-3.5 w-3.5" />;
      case "egg":
        return <Egg className="h-3.5 w-3.5" />;
      case "pork":
        return (
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        );
      case "vegetarian":
        return <Leaf className="h-3.5 w-3.5" />;
      case "vegan":
        return <Sparkles className="h-3.5 w-3.5" />;
      case "spicy":
        return <Flame className="h-3.5 w-3.5" />;
      case "alcohol":
        return <Wine className="h-3.5 w-3.5" />;
      case "nuts":
        return <Nut className="h-3.5 w-3.5" />;
      default:
        return null;
    }
  };

  const getAllergenLabel = (allergen: Allergen) => {
    const labels: Record<Allergen, string> = {
      gluten: "Glúten",
      dairy: "Lácteos",
      egg: "Ovo",
      pork: "Porco",
      vegetarian: "Vegetariano",
      vegan: "Vegano",
      spicy: "Picante",
      alcohol: "Álcool",
      nuts: "Frutos Secos",
    };
    return labels[allergen] || allergen;
  };

  return (
    <div className="bg-cream py-20 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-ember" />
            <span className="text-ember text-sm uppercase tracking-[0.2em] font-medium">
              {t("subtitle")}
            </span>
            <div className="h-px w-12 bg-ember" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-flame-red mb-4">
            {t("title")}
          </h2>
        </div>

        {/* Category Navbar + View Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 bg-charcoal/50 rounded-xl p-2 border border-gunmetal">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${activeCategory === category
                  ? "bg-ember text-charcoal shadow-lg shadow-ember/25"
                  : "text-iron hover:text-smoke hover:bg-gunmetal/50"
                  }`}
              >
                {t(`categories.${category}`)}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-1 bg-charcoal/50 rounded-lg p-1 border border-gunmetal">
            <button
              onClick={() => setViewMode("picture")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${viewMode === "picture"
                ? "bg-ember text-charcoal"
                : "text-iron hover:text-smoke"
                }`}
              title={t("viewMode.picture")}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">{t("viewMode.picture")}</span>
            </button>
            <button
              onClick={() => setViewMode("minimalist")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${viewMode === "minimalist"
                ? "bg-ember text-charcoal"
                : "text-iron hover:text-smoke"
                }`}
              title={t("viewMode.minimalist")}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">{t("viewMode.minimalist")}</span>
            </button>
          </div>
        </div>

        {/* Picture Mode - Premium Card Grid */}
        {viewMode === "picture" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="bg-charcoal border-gunmetal overflow-hidden group hover:border-ember/50 transition-all duration-500 hover:shadow-2xl hover:shadow-ember/10 p-0 gap-0"
              >
                {/* Image Container with Overlay Effects */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={t(`items.${item.translationKey}.name`)}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-br from-ember/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Tags - Top Left */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1.5 bg-gradient-to-r from-ember to-amber-500 text-charcoal text-xs font-bold px-3 py-1.5 rounded-full uppercase shadow-lg shadow-ember/30"
                        >
                          {getTagIcon(tag)}
                          {getTagLabel(tag)}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price Badge - Floating Design */}
                  <div className="absolute bottom-4 right-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-ember/20 blur-xl rounded-full" />
                      <div className="relative bg-gradient-to-br from-charcoal/95 to-charcoal border border-ember/30 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-xl">
                        <span className="text-white font-semibold text-l tracking-tight">
                          €{item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 pt-12">
                    <h3 className="text-smoke font-bold text-xl drop-shadow-lg group-hover:text-ember transition-colors duration-300">
                      {t(`items.${item.translationKey}.name`)}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-5 pt-4">
                  {/* Allergens Row - Above Description */}
                  {item.allergens && item.allergens.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      {item.allergens.map((allergen) => (
                        <div
                          key={allergen}
                          className="group/allergen relative flex items-center justify-center w-6 h-6 rounded-full bg-gunmetal/50 text-iron hover:bg-ember/20 hover:text-ember transition-all duration-200 cursor-help"
                          title={getAllergenLabel(allergen)}
                        >
                          {getAllergenIcon(allergen)}
                          {/* Tooltip */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-charcoal border border-gunmetal rounded px-2 py-1 text-xs text-smoke whitespace-nowrap opacity-0 group-hover/allergen:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg z-10">
                            {getAllergenLabel(allergen)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-iron text-sm leading-relaxed line-clamp-2">
                    {t(`items.${item.translationKey}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Minimalist Mode - Elegant List */}
        {viewMode === "minimalist" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-charcoal/30 border border-gunmetal rounded-2xl p-6 sm:p-10">
              {/* Category Title */}
              <h3 className="text-center text-ember text-2xl font-bold uppercase tracking-widest mb-8 pb-4 border-b border-gunmetal">
                {t(`categories.${activeCategory}`)}
              </h3>

              {/* Menu Items List */}
              <div className="space-y-6">
                {filteredItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: Name + Description */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-ember font-semibold text-lg">
                            {t(`items.${item.translationKey}.name`)}
                          </h4>
                          {/* Tags as subtle badges */}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex gap-1">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="flex items-center gap-0.5 text-ember text-xs"
                                  title={getTagLabel(tag)}
                                >
                                  {getTagIcon(tag)}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-iron text-sm leading-relaxed line-clamp-2 mb-2">
                          {t(`items.${item.translationKey}.description`)}
                        </p>
                        {/* Allergens inline */}
                        {item.allergens && item.allergens.length > 0 && (
                          <div className="flex items-center gap-1.5">
                            {item.allergens.map((allergen) => (
                              <span
                                key={allergen}
                                className="text-iron/50 hover:text-ember transition-colors"
                                title={getAllergenLabel(allergen)}
                              >
                                {getAllergenIcon(allergen)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Price */}
                      <div className="flex-shrink-0">
                        <span className="text-white text-base whitespace-nowrap">
                          €{item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Divider (except last item) */}
                    {index < filteredItems.length - 1 && (
                      <div className="mt-6 border-b border-gunmetal/50" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
