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
  UtensilsCrossed,
  Coffee,
  IceCream,
  Beer,
} from "lucide-react";
import { MenuCategory, Allergen } from "@/types";

const categories: MenuCategory[] = ["burgers", "drinks", "sides", "milkshakes"];

const getCategoryIcon = (category: MenuCategory) => {
  switch (category) {
    case "burgers":
      return <UtensilsCrossed className="h-5 w-5" />;
    case "drinks":
      return <Coffee className="h-5 w-5" />;
    case "sides":
      return <Beer className="h-5 w-5" />;
    case "milkshakes":
      return <IceCream className="h-5 w-5" />;
    default:
      return null;
  }
};

const getCategoryEmoji = (category: MenuCategory) => {
  switch (category) {
    case "burgers":
      return "🍔";
    case "drinks":
      return "🥤";
    case "sides":
      return "🍟";
    case "milkshakes":
      return "🥛";
    default:
      return "🍽️";
  }
};

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

  const getTagColors = (tag: string) => {
    switch (tag) {
      case "popular":
        return "bg-gradient-to-r from-tomato to-tomato-light text-white";
      case "vegetarian":
        return "bg-gradient-to-r from-mint to-mint-light text-white";
      case "premium":
      case "signature":
        return "bg-gradient-to-r from-sunshine to-mustard text-espresso";
      case "spicy":
        return "bg-gradient-to-r from-mustard to-tomato text-white";
      case "bestseller":
        return "bg-gradient-to-r from-tomato to-sunshine text-white";
      default:
        return "bg-soft-beige text-coffee";
    }
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
    <section className="relative bg-cream py-20 lg:py-28 overflow-hidden">
      {/* Fun decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sunshine/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-tomato/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-mint/10 rounded-full blur-3xl" />

      {/* Decorative dots pattern */}
      <div className="absolute inset-0 pattern-dots opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Fun & Playful */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg shadow-tomato/10 mb-6">
            <span className="text-2xl">🍽️</span>
            <span className="text-tomato text-sm uppercase tracking-[0.2em] font-bold">
              {t("subtitle")}
            </span>
            <span className="text-2xl">✨</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-espresso mb-4 leading-tight">
            {t("title").split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-tomato">{t("title").split(" ").slice(-1)}</span>
          </h2>
        </div>

        {/* Category Navbar + View Toggle */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
          {/* Category Pills - Fun rounded buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`cursor-pointer group relative flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wide transition-all duration-400 ease-out ${activeCategory === category
                  ? "bg-tomato text-white shadow-xl shadow-tomato/30 scale-105"
                  : "bg-white text-coffee hover:bg-soft-beige hover:shadow-lg hover:scale-102 border-2 border-sand hover:border-tomato/30"
                  }`}
              >
                {/* Category emoji on hover */}
                <span className={`transition-transform duration-300 ${activeCategory === category ? "scale-110" : "group-hover:scale-125"}`}>
                  {getCategoryEmoji(category)}
                </span>
                <span>{t(`categories.${category}`)}</span>

                {/* Active indicator dot */}
                {activeCategory === category && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-sunshine rounded-full border-2 border-white animate-pulse-glow" />
                )}
              </button>
            ))}
          </div>

          {/* View Mode Toggle - Clean switch */}
          <div className="flex gap-2 bg-white rounded-2xl p-1.5 shadow-lg border-2 border-sand">
            <button
              onClick={() => setViewMode("picture")}
              className={`cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${viewMode === "picture"
                ? "bg-tomato text-white shadow-md"
                : "text-latte hover:text-espresso hover:bg-soft-beige"
                }`}
              title={t("viewMode.picture")}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">{t("viewMode.picture")}</span>
            </button>
            <button
              onClick={() => setViewMode("minimalist")}
              className={`cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${viewMode === "minimalist"
                ? "bg-tomato text-white shadow-md"
                : "text-latte hover:text-espresso hover:bg-soft-beige"
                }`}
              title={t("viewMode.minimalist")}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">{t("viewMode.minimalist")}</span>
            </button>
          </div>
        </div>

        {/* Picture Mode - Fun Card Grid */}
        {viewMode === "picture" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className="group bg-white border-2 border-sand overflow-hidden rounded-3xl hover:border-tomato/40 transition-all duration-500 hover:shadow-2xl hover:shadow-tomato/15 p-0 gap-0 card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Container with Fun Effects */}
                <div className="relative h-56 overflow-hidden bg-soft-beige">
                  <Image
                    src={item.image}
                    alt={t(`items.${item.translationKey}.name`)}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Tags - Top Left with fun styling */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`flex items-center gap-1.5 ${getTagColors(tag)} text-xs font-bold px-3 py-1.5 rounded-full uppercase shadow-lg`}
                        >
                          {getTagIcon(tag)}
                          {getTagLabel(tag)}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price Badge - Fun floating design */}
                  <div className="absolute bottom-4 right-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-tomato/30 blur-lg rounded-full scale-150" />
                      <div className="relative bg-white border-3 border-tomato rounded-2xl px-4 py-2 shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <span className="text-tomato font-black text-lg">
                          €{item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6 pt-5">
                  {/* Item Name with fun styling */}
                  <h3 className="text-espresso font-bold text-xl mb-2 group-hover:text-tomato transition-colors duration-300">
                    {t(`items.${item.translationKey}.name`)}
                  </h3>

                  {/* Allergens Row - Colorful icons */}
                  {item.allergens && item.allergens.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {item.allergens.map((allergen) => (
                        <div
                          key={allergen}
                          className="group/allergen relative flex items-center justify-center w-7 h-7 rounded-full bg-soft-beige text-latte hover:bg-mint/20 hover:text-mint transition-all duration-200 cursor-help"
                          title={getAllergenLabel(allergen)}
                        >
                          {getAllergenIcon(allergen)}
                          {/* Tooltip */}
                          <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-espresso rounded-lg px-3 py-1.5 text-xs text-white whitespace-nowrap opacity-0 group-hover/allergen:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg z-10">
                            {getAllergenLabel(allergen)}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-espresso" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-latte text-sm leading-relaxed line-clamp-2">
                    {t(`items.${item.translationKey}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Minimalist Mode - Clean List */}
        {viewMode === "minimalist" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-2 border-sand rounded-3xl p-8 sm:p-12 shadow-xl">
              {/* Category Title with emoji */}
              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-sand" />
                <h3 className="flex items-center gap-3 text-tomato text-2xl font-black uppercase tracking-widest">
                  <span className="text-3xl">{getCategoryEmoji(activeCategory)}</span>
                  {t(`categories.${activeCategory}`)}
                </h3>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-sand" />
              </div>

              {/* Menu Items List */}
              <div className="space-y-0">
                {filteredItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="group flex items-start justify-between gap-6 py-6 hover:bg-soft-beige/50 px-4 -mx-4 rounded-2xl transition-colors duration-300">
                      {/* Left: Name + Description */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-espresso font-bold text-lg group-hover:text-tomato transition-colors">
                            {t(`items.${item.translationKey}.name`)}
                          </h4>
                          {/* Tags as subtle icons */}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex gap-1.5">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className={`flex items-center justify-center w-6 h-6 rounded-full ${getTagColors(tag)}`}
                                  title={getTagLabel(tag)}
                                >
                                  {getTagIcon(tag)}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-latte text-sm leading-relaxed line-clamp-2 mb-2">
                          {t(`items.${item.translationKey}.description`)}
                        </p>
                        {/* Allergens inline */}
                        {item.allergens && item.allergens.length > 0 && (
                          <div className="flex items-center gap-2">
                            {item.allergens.map((allergen) => (
                              <span
                                key={allergen}
                                className="text-cappuccino hover:text-mint transition-colors"
                                title={getAllergenLabel(allergen)}
                              >
                                {getAllergenIcon(allergen)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Dotted line connector */}
                      <div className="flex-shrink-0 flex-1 max-w-32 border-b-2 border-dotted border-sand self-center mx-4" />

                      {/* Right: Price */}
                      <div className="flex-shrink-0">
                        <span className="text-tomato font-black text-xl">
                          €{item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Divider (except last item) */}
                    {index < filteredItems.length - 1 && (
                      <div className="border-b border-sand/50" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
