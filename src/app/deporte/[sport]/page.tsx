import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockClubs, mockProducts } from "@/data/mock";
import { ClubCard } from "@/components/club/club-card";
import { ProductCard } from "@/components/product/product-card";
import { siteConfig } from "@/config/site";

interface SportPageProps {
  params: Promise<{ sport: string }>;
}

export async function generateStaticParams() {
  return siteConfig.sports.map((s) => ({ sport: s.id }));
}

export async function generateMetadata({ params }: SportPageProps): Promise<Metadata> {
  const { sport } = await params;
  const sportData = siteConfig.sports.find((s) => s.id === sport);
  if (!sportData) return { title: "Deporte no encontrado" };
  return {
    title: `${sportData.name} - Clubes y Merchandising`,
    description: `Encuentra clubes y productos oficiales de ${sportData.name} en toda España`,
  };
}

export default async function SportPage({ params }: SportPageProps) {
  const { sport } = await params;
  const sportData = siteConfig.sports.find((s) => s.id === sport);

  if (!sportData) notFound();

  const clubs = mockClubs.filter((c) => c.sport.id === sport);
  const products = mockProducts.filter((p) => clubs.some((c) => c.id === p.club.id));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-7xl mb-4">{sportData.emoji}</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-3">{sportData.name}</h1>
            <p className="text-white/70 text-lg">
              {clubs.length} clubes · {products.length} productos oficiales en España
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Clubs */}
        {clubs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-black mb-6">
              Clubes de {sportData.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {clubs.map((club) => (
                <ClubCard key={club.id} club={club} />
              ))}
            </div>
          </section>
        )}

        {/* Products */}
        {products.length > 0 && (
          <section>
            <h2 className="text-2xl font-black mb-6">
              Productos de {sportData.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
