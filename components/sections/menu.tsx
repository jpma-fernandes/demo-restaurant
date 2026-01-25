"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { menuItems } from "@/config/sections";
import { Flame, Leaf, Award, Zap, LayoutGrid, List } from "lucide-react";
import { MenuCategory } from "@/types";

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

  return (
    <div className="bg-steel py-20 lg:py-32">
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
          <h2 className="text-4xl md:text-5xl font-bold text-smoke mb-4">
            {t("title")}
          </h2>
          <p className="text-iron text-lg">{t("description")}</p>
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

        {/* Picture Mode - Card Grid */}
        {viewMode === "picture" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="bg-charcoal border-gunmetal overflow-hidden group hover:border-ember transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={t(`items.${item.translationKey}.name`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="absolute top-3 left-3 flex gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 bg-ember/90 text-charcoal text-xs font-bold px-2 py-1 rounded uppercase"
                        >
                          {getTagIcon(tag)}
                          {getTagLabel(tag)}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price */}
                  <div className="absolute bottom-3 right-3 bg-charcoal/90 text-ember font-bold text-lg px-3 py-1 rounded">
                    €{item.price.toFixed(2)}
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-5">
                  <h3 className="text-smoke font-bold text-xl mb-2 group-hover:text-ember transition-colors">
                    {t(`items.${item.translationKey}.name`)}
                  </h3>
                  <p className="text-iron text-sm leading-relaxed">
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
                          <h4 className="text-smoke font-semibold text-lg">
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
                        <p className="text-iron text-sm leading-relaxed line-clamp-2">
                          {t(`items.${item.translationKey}.description`)}
                        </p>
                      </div>

                      {/* Right: Price */}
                      <div className="flex-shrink-0">
                        <span className="text-ember font-bold text-lg whitespace-nowrap">
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
