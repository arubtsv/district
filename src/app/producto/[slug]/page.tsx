import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockProducts } from "@/data/mock";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductCard } from "@/components/product/product-card";
import { siteConfig } from "@/config/site";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mockProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = mockProducts.find((p) => p.slug === slug);
  if (!product) return { title: "Producto no encontrado" };

  return {
    title: `${product.name} - ${product.club.name}`,
    description: product.shortDesc ?? product.description ?? "",
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.shortDesc ?? "",
      images: product.images[0] ? [{ url: product.images[0].url }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = mockProducts.find((p) => p.slug === slug);

  if (!product) notFound();

  const related = mockProducts
    .filter((p) => p.id !== product.id && p.club.id === product.club.id)
    .slice(0, 4);

  const alsoLike = related.length < 4
    ? [...related, ...mockProducts.filter((p) => p.id !== product.id && !related.some((r) => r.id === p.id)).slice(0, 4 - related.length)]
    : related;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetail product={product} />

        {/* Related products */}
        {alsoLike.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black mb-6">También te puede gustar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {alsoLike.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
