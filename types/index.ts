import { ComponentType } from "react";

// Section configuration types
export interface SectionConfig {
  id: string;
  translationKey: string;
  defaultEnabled: boolean;
  defaultOrder: number;
}

export interface SectionState {
  id: string;
  enabled: boolean;
  order: number;
}

export interface SectionConfigState {
  sections: SectionState[];
  toggleSection: (id: string) => void;
  reorderSections: (activeId: string, overId: string) => void;
  resetToDefaults: () => void;
  getEnabledSections: () => SectionState[];
}

// Menu category type
export type MenuCategory = "burgers" | "drinks" | "sides" | "milkshakes";

// Allergen/dietary type
export type Allergen = "pork" | "egg" | "gluten" | "dairy" | "vegetarian" | "vegan" | "spicy" | "alcohol" | "nuts";

// Menu item type
export interface MenuItem {
  id: string;
  translationKey: string;
  price: number;
  image: string;
  category: MenuCategory;
  tags?: string[];
  allergens?: Allergen[];
}

// Event item type
export interface EventItem {
  id: string;
  translationKey: string;
  image: string;
  featured?: boolean;
}

// Testimonial type
export interface Testimonial {
  id: string;
  translationKey: string;
  avatar: string;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ReservationFormData {
  date: Date | undefined;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

// Locale types
export type Locale = "pt" | "en";

// Navigation item type
export interface NavItem {
  label: string;
  href: string;
  sectionId?: string;
}
