/**
 * Global site configuration — edit this file to rebrand the platform
 */
export const siteConfig = {
  name: "FanZone España",
  shortName: "FanZone",
  tagline: "Encuentra merchandising oficial de clubes deportivos de toda España",
  description:
    "El marketplace líder de merchandising deportivo en España. Desde equipos locales hasta clubes profesionales, encuentra la equipación oficial de tu club favorito.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://fanzone.es",
  locale: "es-ES",
  currency: "EUR",
  currencySymbol: "€",

  // Branding
  primaryColor: "#E63946", // Editable main color
  secondaryColor: "#1D3557",

  // Social
  social: {
    twitter: "https://twitter.com/fanzone_es",
    instagram: "https://instagram.com/fanzone_es",
    facebook: "https://facebook.com/fanzonees",
    tiktok: "https://tiktok.com/@fanzone_es",
  },

  // Contact
  contact: {
    email: "hola@fanzone.es",
    support: "soporte@fanzone.es",
    clubs: "clubes@fanzone.es",
  },

  // Marketplace settings
  marketplace: {
    commissionRate: 0.08, // 8% commission
    minWithdrawal: 50, // EUR
    shippingBaseRate: 3.99,
    freeShippingThreshold: 50,
  },

  // Sports categories
  sports: [
    { id: "futbol", name: "Fútbol", emoji: "⚽", icon: "football" },
    { id: "padel", name: "Pádel", emoji: "🏸", icon: "padel" },
    { id: "baloncesto", name: "Baloncesto", emoji: "🏀", icon: "basketball" },
    { id: "ciclismo", name: "Ciclismo", emoji: "🚴", icon: "cycling" },
    { id: "tenis", name: "Tenis", emoji: "🎾", icon: "tennis" },
  ],

  // Spanish regions
  regions: [
    "Andalucía",
    "Aragón",
    "Asturias",
    "Baleares",
    "Canarias",
    "Cantabria",
    "Castilla-La Mancha",
    "Castilla y León",
    "Cataluña",
    "Extremadura",
    "Galicia",
    "La Rioja",
    "Madrid",
    "Murcia",
    "Navarra",
    "País Vasco",
    "Valencia",
    "Ceuta",
    "Melilla",
  ],

  // Product badges
  badges: {
    official: { label: "Oficial", color: "blue" },
    topSeller: { label: "Top Ventas", color: "orange" },
    limited: { label: "Edición Limitada", color: "purple" },
    verified: { label: "Club Verificado", color: "green" },
    new: { label: "Nuevo", color: "emerald" },
    sale: { label: "Oferta", color: "red" },
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type SportId = (typeof siteConfig.sports)[number]["id"];
export type BadgeType = keyof typeof siteConfig.badges;
