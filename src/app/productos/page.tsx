import type { Metadata } from "next";
import Link from "next/link";
import { mockProducts } from "@/data/mock";
import { ProductCard } from "@/components/product/product-card";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Productos",
  description: "Encuentra merchandising oficial de clubes deportivos de toda España",
};

interface ProductsPageProps {
  searchParams: Promise<{ categoria?: string; badge?: string; deporte?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { categoria, badge, deporte } = await searchParams;

  const filtered = mockProducts.filter((p) => {
    const matchesCategory = !categoria || p.category?.slug === categoria;
    const matchesBadge =
      !badge ||
      (badge === "limited" && p.isLimited) ||
      (badge === "official" && p.isOfficial) ||
      (badge === "new" && p.isNew) ||
      (badge === "topSeller" && p.isTopSeller);
    return matchesCategory && matchesBadge;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2">Todos los Productos</h1>
          <p className="text-muted-foreground">{filtered.length} productos oficiales</p>
        </div>

        {/* Quick filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { label: "Todos", href: "/productos" },
            { label: "⭐ Ediciones limitadas", href: "/productos?badge=limited" },
            { label: "🏅 Oficiales", href: "/productos?badge=official" },
            { label: "🔥 Top ventas", href: "/productos?badge=topSeller" },
            { label: "✨ Novedades", href: "/productos?badge=new" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-muted hover:bg-accent transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
