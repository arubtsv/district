import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin, Calendar, ExternalLink, Package, Star } from "lucide-react";
import { IconInstagram, IconTwitterX, IconFacebook } from "@/components/ui/social-icons";
import { mockClubs, mockProducts } from "@/data/mock";
import { ProductCard } from "@/components/product/product-card";
import { ProductBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

interface ClubPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mockClubs.map((club) => ({ slug: club.slug }));
}

export async function generateMetadata({ params }: ClubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const club = mockClubs.find((c) => c.slug === slug);
  if (!club) return { title: "Club no encontrado" };

  return {
    title: `${club.name} - Tienda Oficial`,
    description: club.description ?? club.shortDesc ?? `Merchandising oficial de ${club.name}`,
    openGraph: {
      title: `${club.name} | ${siteConfig.name}`,
      description: club.shortDesc ?? "",
      images: club.banner ? [{ url: club.banner }] : [],
    },
  };
}

export default async function ClubPage({ params }: ClubPageProps) {
  const { slug } = await params;
  const club = mockClubs.find((c) => c.slug === slug);

  if (!club) notFound();

  const clubProducts = mockProducts.filter((p) => p.club.slug === slug);

  const sportColor: Record<string, string> = {
    futbol: "from-green-600 to-emerald-400",
    baloncesto: "from-orange-600 to-amber-400",
    ciclismo: "from-red-600 to-rose-400",
    padel: "from-blue-600 to-sky-400",
    tenis: "from-yellow-600 to-amber-400",
  };
  const gradient = sportColor[club.sport.slug] ?? "from-slate-600 to-slate-400";

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        {club.banner ? (
          <Image
            src={club.banner}
            alt={`Banner ${club.name}`}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-r ${gradient}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Club info section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 sm:-mt-20 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            {/* Logo */}
            <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-2xl border-4 border-background shadow-xl overflow-hidden bg-white flex-shrink-0">
              {club.logo ? (
                <Image
                  src={club.logo}
                  alt={`Logo ${club.name}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center text-white text-4xl font-black bg-gradient-to-br ${gradient}`}>
                  {club.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground">
                  {club.name}
                </h1>
                {club.verified && (
                  <CheckCircle2 className="h-6 w-6 text-blue-500 flex-shrink-0" />
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="text-base">{club.sport.emoji}</span>
                  {club.sport.name}
                </span>
                {club.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {club.city}{club.region && `, ${club.region}`}
                  </span>
                )}
                {club.founded && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Fundado en {club.founded}
                  </span>
                )}
                {club.division && (
                  <span className="bg-muted px-2 py-0.5 rounded-full text-xs font-medium">
                    {club.division}
                  </span>
                )}
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              {club.verified && <ProductBadge type="verified" size="md" />}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 pb-16">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            {club.description && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-3">Sobre el Club</h2>
                <p className="text-muted-foreground leading-relaxed">{club.description}</p>
              </div>
            )}

            {/* Products */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black">
                  Productos Oficiales
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    ({clubProducts.length})
                  </span>
                </h2>
              </div>

              {clubProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {clubProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-muted/30 rounded-2xl">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="font-semibold text-foreground">Próximamente</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Este club está preparando sus productos oficiales
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Stats */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold mb-4">Estadísticas</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Productos</span>
                  <span className="font-semibold">{club._count?.products ?? clubProducts.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">División</span>
                  <span className="font-semibold text-sm">{club.division ?? "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Liga</span>
                  <span className="font-semibold text-sm">{club.league ?? "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Ciudad</span>
                  <span className="font-semibold text-sm">{club.city ?? "—"}</span>
                </div>
              </div>
            </div>

            {/* Social */}
            {(club.instagram || club.twitter || club.facebook) && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-bold mb-4">Redes Sociales</h3>
                <div className="space-y-2">
                  {club.instagram && (
                    <a
                      href={club.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent transition-colors text-sm"
                    >
                      <IconInstagram className="h-4 w-4 text-pink-500" />
                      <span>Instagram</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
                    </a>
                  )}
                  {club.twitter && (
                    <a
                      href={club.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent transition-colors text-sm"
                    >
                      <IconTwitterX className="h-4 w-4 text-blue-400" />
                      <span>Twitter / X</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
                    </a>
                  )}
                  {club.facebook && (
                    <a
                      href={club.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent transition-colors text-sm"
                    >
                      <IconFacebook className="h-4 w-4 text-blue-600" />
                      <span>Facebook</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* CTA for club owners */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
              <Star className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="font-semibold text-sm mb-1">¿Eres el responsable del club?</p>
              <p className="text-xs text-muted-foreground mb-4">
                Gestiona tus productos, pedidos y estadísticas desde el panel de club.
              </p>
              <Button size="sm" className="w-full" asChild>
                <Link href="/club/dashboard">Acceder al Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
