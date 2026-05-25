"use client";

import { useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { mockClubs, mockProducts } from "@/data/mock";
import { ClubCard } from "@/components/club/club-card";
import { ProductCard } from "@/components/product/product-card";
import { SearchBar } from "./search-bar";
import { siteConfig } from "@/config/site";

interface SearchResultsProps {
  query: string;
  deporte?: string;
  region?: string;
}

export function SearchResults({ query, deporte, region }: SearchResultsProps) {
  const results = useMemo(() => {
    const q = query.toLowerCase();

    const clubs = mockClubs.filter((c) => {
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        (c.city?.toLowerCase().includes(q) ?? false) ||
        (c.region?.toLowerCase().includes(q) ?? false) ||
        c.sport.name.toLowerCase().includes(q);

      const matchesSport = !deporte || c.sport.id === deporte;
      const matchesRegion = !region || c.region === region;

      return matchesQuery && matchesSport && matchesRegion;
    });

    const products = mockProducts.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.club.name.toLowerCase().includes(q) ||
        (p.category?.name.toLowerCase().includes(q) ?? false);

      return matchesQuery;
    });

    return { clubs, products };
  }, [query, deporte, region]);

  return (
    <div>
      {/* Search bar */}
      <div className="mb-8">
        <SearchBar className="max-w-2xl" />
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          {query && (
            <h1 className="text-2xl font-black mb-1">
              Resultados para <span className="text-primary">"{query}"</span>
            </h1>
          )}
          <p className="text-muted-foreground text-sm">
            {results.clubs.length} clubes y {results.products.length} productos encontrados
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-accent transition-colors">
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </button>
      </div>

      {/* No results */}
      {results.clubs.length === 0 && results.products.length === 0 && (
        <div className="text-center py-16">
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h2 className="text-xl font-bold mb-2">No encontramos resultados</h2>
          <p className="text-muted-foreground mb-6">
            Intenta con otros términos de búsqueda
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Fútbol", "Barcelona", "Camisetas", "Baloncesto", "Madrid"].map((term) => (
              <a
                key={term}
                href={`/buscar?q=${term}`}
                className="px-4 py-2 rounded-xl bg-muted text-sm hover:bg-accent transition-colors"
              >
                {term}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Clubs */}
      {results.clubs.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold mb-4">Clubes ({results.clubs.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </section>
      )}

      {/* Products */}
      {results.products.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-4">Productos ({results.products.length})</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
