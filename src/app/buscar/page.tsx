import type { Metadata } from "next";
import { SearchResults } from "@/components/home/search-results";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; deporte?: string; region?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `"${q}" - Búsqueda` : "Búsqueda",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchResults query={params.q ?? ""} deporte={params.deporte} region={params.region} />
      </div>
    </div>
  );
}
