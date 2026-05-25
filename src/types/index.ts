import { siteConfig } from "@/config/site";

export type SportId = (typeof siteConfig.sports)[number]["id"];
export type BadgeType = keyof typeof siteConfig.badges;

export interface Club {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  shortDesc?: string | null;
  logo?: string | null;
  banner?: string | null;
  city?: string | null;
  province?: string | null;
  region?: string | null;
  country: string;
  verified: boolean;
  featured: boolean;
  division?: string | null;
  league?: string | null;
  founded?: number | null;
  instagram?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  sport: {
    id: string;
    name: string;
    slug: string;
    emoji?: string | null;
  };
  _count?: {
    products: number;
  };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  shortDesc?: string | null;
  price: number;
  comparePrice?: number | null;
  isOfficial: boolean;
  isLimited: boolean;
  isTopSeller: boolean;
  isNew: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
  club: {
    id: string;
    name: string;
    slug: string;
    logo?: string | null;
    verified: boolean;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  _count?: {
    reviews: number;
  };
  avgRating?: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string | null;
  order: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  type: "SIZE" | "COLOR" | "STYLE" | "MATERIAL";
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  clubId: string;
  clubName: string;
  clubSlug: string;
  selectedVariants?: Record<string, string>;
}

export interface SearchResult {
  clubs: Club[];
  products: Product[];
  query: string;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FilterOptions {
  sport?: string;
  region?: string;
  city?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  verified?: boolean;
  featured?: boolean;
  sortBy?: "newest" | "popular" | "price_asc" | "price_desc" | "rating";
}
