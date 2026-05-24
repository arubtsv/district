"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Zap,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Truck,
  RotateCcw,
  Shield,
  Star,
  MapPin,
} from "lucide-react";
import { Product } from "@/types";
import { formatPrice, getDiscountPercentage, cn } from "@/lib/utils";
import { ProductBadge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import toast from "react-hot-toast";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const { addItem, openCart } = useCartStore();

  const discount = product.comparePrice
    ? getDiscountPercentage(product.price, product.comparePrice)
    : 0;

  const variantGroups = product.variants.reduce<Record<string, string[]>>((acc, v) => {
    if (!acc[v.type]) acc[v.type] = [];
    if (!acc[v.type].includes(v.value)) acc[v.type].push(v.value);
    return acc;
  }, {});

  const variantLabels: Record<string, string> = {
    SIZE: "Talla",
    COLOR: "Color",
    STYLE: "Estilo",
    MATERIAL: "Material",
  };

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${JSON.stringify(selectedVariants)}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url,
      quantity,
      clubId: product.club.id,
      clubName: product.club.name,
      clubSlug: product.club.slug,
      selectedVariants,
    });
    toast.success("Producto añadido al carrito");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    openCart();
  };

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
        <span>/</span>
        <Link href="/productos" className="hover:text-foreground transition-colors">Productos</Link>
        <span>/</span>
        <Link href={`/club/${product.club.slug}`} className="hover:text-foreground transition-colors">
          {product.club.name}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 xl:gap-12">
        {/* Images */}
        <div className="space-y-3">
          {/* Main image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted group">
            {product.images.length > 0 ? (
              <Image
                src={product.images[activeImage].url}
                alt={product.images[activeImage].alt ?? product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Sin imagen disponible
              </div>
            )}

            {/* Navigation arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImage((i) => (i - 1 + product.images.length) % product.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 dark:bg-background/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveImage((i) => (i + 1) % product.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 dark:bg-background/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Discount badge */}
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-destructive text-white font-bold px-3 py-1 rounded-full text-sm">
                -{discount}%
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    "relative flex-none h-16 w-16 rounded-lg overflow-hidden border-2 transition-all",
                    activeImage === index
                      ? "border-primary shadow-md"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <Image
                    src={image.url}
                    alt={image.alt ?? ""}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="space-y-6">
          {/* Club */}
          <div className="flex items-center gap-2">
            <Link
              href={`/club/${product.club.slug}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="font-medium">{product.club.name}</span>
              {product.club.verified && (
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
              )}
            </Link>
          </div>

          {/* Name */}
          <h1 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          {product._count && product._count.reviews > 0 && product.avgRating && (
            <div className="flex items-center gap-3">
              <Rating value={product.avgRating} size="md" showValue count={product._count.reviews} />
              <span className="text-sm text-muted-foreground">|</span>
              <span className="text-sm text-muted-foreground">
                {product._count.reviews} valoraciones
              </span>
            </div>
          )}

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {product.isOfficial && <ProductBadge type="official" size="md" />}
            {product.isTopSeller && <ProductBadge type="topSeller" size="md" />}
            {product.isLimited && <ProductBadge type="limited" size="md" />}
            {product.isNew && <ProductBadge type="new" size="md" />}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.comparePrice)}
                </span>
                <span className="text-base font-bold text-destructive">-{discount}%</span>
              </>
            )}
          </div>

          {/* Variants */}
          {Object.entries(variantGroups).map(([type, values]) => (
            <div key={type} className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span>{variantLabels[type] ?? type}</span>
                {selectedVariants[type] && (
                  <span className="font-normal text-muted-foreground">: {selectedVariants[type]}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {values.map((value) => (
                  <button
                    key={value}
                    onClick={() => setSelectedVariants((prev) => ({ ...prev, [type]: value }))}
                    className={cn(
                      "px-4 py-2 rounded-xl border text-sm font-medium transition-all",
                      selectedVariants[type] === value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50 text-foreground"
                    )}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="space-y-2">
            <span className="text-sm font-semibold">Cantidad</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10 rounded-xl border border-border flex items-center justify-center hover:bg-accent transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center font-bold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="h-10 w-10 rounded-xl border border-border flex items-center justify-center hover:bg-accent transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4" />
              Añadir al carrito
            </Button>
            <Button size="lg" variant="outline" onClick={() => setWishlisted(!wishlisted)} className="px-4">
              <Heart
                className={cn("h-5 w-5", wishlisted ? "fill-red-500 text-red-500" : "")}
              />
            </Button>
            <Button size="lg" variant="outline" className="px-4">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          <Button size="lg" variant="secondary" className="w-full" onClick={handleBuyNow}>
            <Zap className="h-4 w-4" />
            Comprar ahora
          </Button>

          {/* Shipping info */}
          <div className="bg-muted/50 rounded-2xl p-4 space-y-3">
            {[
              { icon: Truck, text: "Envío gratis a partir de 50€" },
              { icon: RotateCcw, text: "Devoluciones gratuitas en 30 días" },
              { icon: Shield, text: "Producto oficial del club" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          {product.description && (
            <div className="border-t border-border pt-6">
              <h3 className="font-bold mb-3">Descripción</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Club info */}
          <div className="border-t border-border pt-6">
            <Link
              href={`/club/${product.club.slug}`}
              className="flex items-center gap-3 p-4 bg-muted/50 rounded-2xl hover:bg-muted transition-colors group"
            >
              <div className="flex items-center gap-2 text-sm font-semibold flex-1">
                <span>Vendido por {product.club.name}</span>
                {product.club.verified && <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />}
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
