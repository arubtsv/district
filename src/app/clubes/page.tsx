import type { Metadata } from "next";
import Link from "next/link";
import { Filter } from "lucide-react";
import { mockClubs } from "@/data/mock";
import { ClubCard } from "@/components/club/club-card";
import { siteConfig } from "@/config/site";
import { SearchBar } from "@/components/home/search-bar";

export const metadata: Metadata = {
  title: "Clubes Deportivos",
  description: "Descubre todos los clubes deportivos con tienda oficial en FanZone España",
};

interface ClubsPageProps {
  searchParams: Promise<{ deporte?: string; region?: string }>;
}

export default async function ClubsPage({ searchParams }: ClubsPageProps) {
  const { deporte, region } = await searchParams;

  const filtered = mockClubs.filter((c) => {
    const matchesSport = !deporte || c.sport.id === deporte;
    const matchesRegion = !region || c.region === region;
    return matchesSport && matchesRegion;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2">Clubes Deportivos</h1>
          <p className="text-muted-foreground">
            {filtered.length} clubes con tienda oficial en {siteConfig.name}
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar className="max-w-2xl" />
        </div>

        {/* Sport filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/clubes"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              !deporte ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent"
            }`}
          >
            Todos
          </Link>
          {siteConfig.sports.map((sport) => (
            <Link
              key={sport.id}
              href={`/clubes?deporte=${sport.id}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                deporte === sport.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent"
              }`}
            >
              <span>{sport.emoji}</span>
              <span>{sport.name}</span>
            </Link>
          ))}
        </div>

        {/* Clubs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl font-bold mb-2">No hay clubes con estos filtros</p>
            <Link href="/clubes" className="text-primary hover:underline text-sm">
              Ver todos los clubes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
