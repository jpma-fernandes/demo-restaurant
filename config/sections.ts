import { SectionConfig, MenuItem, EventItem, Testimonial } from "@/types";

// Section registry - defines all available sections
export const sectionRegistry: SectionConfig[] = [
  {
    id: "hero",
    translationKey: "hero",
    defaultEnabled: true,
    defaultOrder: 0,
  },
  {
    id: "menu",
    translationKey: "menu",
    defaultEnabled: true,
    defaultOrder: 1,
  },
  {
    id: "about",
    translationKey: "about",
    defaultEnabled: true,
    defaultOrder: 2,
  },
  {
    id: "events",
    translationKey: "events",
    defaultEnabled: true,
    defaultOrder: 3,
  },
  {
    id: "testimonials",
    translationKey: "testimonials",
    defaultEnabled: true,
    defaultOrder: 4,
  },
  {
    id: "reservations",
    translationKey: "reservations",
    defaultEnabled: true,
    defaultOrder: 5,
  },
  {
    id: "contact",
    translationKey: "contact",
    defaultEnabled: true,
    defaultOrder: 6,
  },
];

// Get section display name from translation key
export const getSectionDisplayName = (id: string): string => {
  const section = sectionRegistry.find((s) => s.id === id);
  return section?.translationKey || id;
};

// Menu items data
export const menuItems: MenuItem[] = [
  // Burgers
  {
    id: "classic",
    translationKey: "classic",
    price: 14.9,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    category: "burgers",
    tags: ["popular"],
    allergens: ["gluten", "dairy"],
  },
  {
    id: "smoky",
    translationKey: "smoky",
    price: 17.9,
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80",
    category: "burgers",
    tags: ["signature"],
    allergens: ["gluten", "dairy", "pork"],
  },
  {
    id: "truffle",
    translationKey: "truffle",
    price: 21.9,
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80",
    category: "burgers",
    tags: ["premium"],
    allergens: ["gluten", "dairy"],
  },
  {
    id: "inferno",
    translationKey: "inferno",
    price: 16.9,
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&q=80",
    category: "burgers",
    tags: ["spicy"],
    allergens: ["gluten", "dairy", "spicy"],
  },
  {
    id: "veggie",
    translationKey: "veggie",
    price: 15.9,
    image:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&q=80",
    category: "burgers",
    tags: ["vegetarian"],
    allergens: ["gluten", "dairy", "vegetarian", "nuts"],
  },
  {
    id: "bacon",
    translationKey: "bacon",
    price: 18.9,
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80",
    category: "burgers",
    tags: ["bestseller"],
    allergens: ["gluten", "dairy", "pork", "egg"],
  },

  // Drinks
  {
    id: "cola",
    translationKey: "cola",
    price: 3.5,
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80",
    category: "drinks",
  },
  {
    id: "lemonade",
    translationKey: "lemonade",
    price: 4.5,
    image:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80",
    category: "drinks",
    tags: ["popular"],
    allergens: ["vegan"],
  },
  {
    id: "craftBeer",
    translationKey: "craftBeerDrink",
    price: 5.9,
    image:
      "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80",
    category: "drinks",
    tags: ["premium"],
    allergens: ["gluten", "alcohol"],
  },
  {
    id: "sparklingWater",
    translationKey: "sparklingWater",
    price: 2.9,
    image:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=80",
    category: "drinks",
    allergens: ["vegan"],
  },

  // Sides
  {
    id: "fries",
    translationKey: "fries",
    price: 4.9,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80",
    category: "sides",
    tags: ["popular"],
    allergens: ["vegan"],
  },
  {
    id: "onionRings",
    translationKey: "onionRings",
    price: 5.9,
    image:
      "https://images.unsplash.com/photo-1639024471283-03518883512d?w=800&q=80",
    category: "sides",
    allergens: ["gluten", "egg"],
  },
  {
    id: "coleslaw",
    translationKey: "coleslaw",
    price: 3.9,
    image:
      "https://images.unsplash.com/photo-1625938145744-e380515399bf?w=800&q=80",
    category: "sides",
    allergens: ["egg", "vegetarian"],
  },
  {
    id: "nachos",
    translationKey: "nachos",
    price: 7.9,
    image:
      "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&q=80",
    category: "sides",
    tags: ["signature"],
    allergens: ["dairy", "vegetarian"],
  },

  // Milkshakes
  {
    id: "chocolateShake",
    translationKey: "chocolateShake",
    price: 6.5,
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80",
    category: "milkshakes",
    tags: ["popular"],
    allergens: ["dairy"],
  },
  {
    id: "strawberryShake",
    translationKey: "strawberryShake",
    price: 6.5,
    image:
      "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&q=80",
    category: "milkshakes",
    allergens: ["dairy"],
  },
  {
    id: "vanillaShake",
    translationKey: "vanillaShake",
    price: 6.5,
    image:
      "https://images.unsplash.com/photo-1568901839119-631418a3910d?w=800&q=80",
    category: "milkshakes",
    allergens: ["dairy"],
  },
  {
    id: "oreoShake",
    translationKey: "oreoShake",
    price: 7.5,
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
    category: "milkshakes",
    tags: ["premium"],
    allergens: ["dairy", "gluten"],
  },
];

// Events data
export const eventItems: EventItem[] = [
  {
    id: "liveMusic",
    translationKey: "liveMusic",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    featured: true,
  },
  {
    id: "burgerChallenge",
    translationKey: "burgerChallenge",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
  },
  {
    id: "craftBeer",
    translationKey: "craftBeer",
    image:
      "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80",
  },
  {
    id: "brunch",
    translationKey: "brunch",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&q=80",
  },
];

// Testimonials data
export const testimonialItems: Testimonial[] = [
  {
    id: "review1",
    translationKey: "review1",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: "review2",
    translationKey: "review2",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: "review3",
    translationKey: "review3",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    id: "review4",
    translationKey: "review4",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
];

// Available time slots for reservations
export const timeSlots = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

// Guest options for reservations
export const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
