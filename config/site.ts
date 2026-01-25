// Site-wide configuration
export const siteConfig = {
  name: "Forge Burger",
  description: "Artisan burgers forged with passion",
  url: "https://forgeburger.pt",
  logo: "/logo.svg",
  
  // Contact information
  contact: {
    phone: "+351 222 333 444",
    email: "info@forgeburger.pt",
    address: {
      street: "Rua da Forja Industrial, 42",
      city: "Porto",
      postalCode: "4000-123",
      country: "Portugal",
    },
  },
  
  // Business hours
  hours: {
    monday: null, // Closed
    tuesday: { open: "12:00", close: "23:00" },
    wednesday: { open: "12:00", close: "23:00" },
    thursday: { open: "12:00", close: "23:00" },
    friday: { open: "12:00", close: "23:00" },
    saturday: { open: "12:00", close: "23:00" },
    sunday: { open: "12:00", close: "23:00" },
  },
  
  // Social media links
  social: {
    instagram: "https://instagram.com/forgeburger",
    facebook: "https://facebook.com/forgeburger",
    twitter: "https://twitter.com/forgeburger",
    tiktok: "https://tiktok.com/@forgeburger",
  },
  
  // localStorage key for section config
  storageKey: "forge-burger-section-config",
};
