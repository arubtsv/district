import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { SportFilters } from "@/components/home/sport-filters";
import { FeaturedClubs } from "@/components/home/featured-clubs";
import { PopularProducts } from "@/components/home/popular-products";
import { SportsMap } from "@/components/home/sports-map";
import { LocalClubCTA } from "@/components/home/local-club-cta";
import { Newsletter } from "@/components/home/newsletter";
import { mockClubs, mockProducts } from "@/data/mock";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} - Merchandising Oficial de Clubes Deportivos de España`,
  description: siteConfig.description,
};

export default function HomePage() {
  const featuredClubs = mockClubs.filter((c) => c.featured);
  const allClubs = mockClubs;

  return (
    <>
      <Hero />
      <SportFilters />
      <FeaturedClubs clubs={allClubs} />
      <PopularProducts products={mockProducts} />
      <SportsMap />
      <LocalClubCTA />
      <Newsletter />
    </>
  );
}
