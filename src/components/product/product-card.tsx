"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, CheckCircle2 } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, getDiscountPercentage, cn } from "@/lib/utils";
import { ProductBadge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { useCartStore } from "@/store/cart";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const mainImage = product.images[0];
  const discount = product.comparePrice
    ? getDiscountPercentage(product.price, product.comparePrice)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: mainImage?.url,
      quantity: 1,
      clubId: product.club.id,
      clubName: product.club.name,
      clubSlug: product.club.slug,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn("group relative", className)}
    >
      <Link href={`/producto/${product.slug}`}>
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* Image container */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            {mainImage ? (
              <Image
                src={mainImage.url}
                alt={mainImage.alt ?? product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                Sin imagen
              </div>
            )}

            {/* Discount badge */}
            {discount > 0 && (
              <div className="absolute top-3 left-3 bg-destructive text-white text-xs font-bold px-2 py-0.5 rounded-full">
                -{discount}%
              </div>
            )}

            {/* Badges row */}
            <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
              {product.isLimited && <ProductBadge type="limited" />}
              {product.isNew && <ProductBadge type="new" />}
            </div>

            {/* Wishlist button */}
            <button
              onClick={handleWishlist}
              className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-background/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
              aria-label="Añadir a favoritos"
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"
                )}
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Club */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-xs text-muted-foreground truncate">{product.club.name}</span>
              {product.club.verified && (
                <CheckCircle2 className="h-3 w-3 text-blue-500 flex-shrink-0" />
              )}
            </div>

            {/* Name */}
            <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug mb-2">
              {product.name}
            </h3>

            {/* Rating */}
            {product._count && product._count.reviews > 0 && product.avgRating && (
              <div className="mb-2">
                <Rating
                  value={product.avgRating}
                  count={product._count.reviews}
                  showValue
                />
              </div>
            )}

            {/* Badges row */}
            <div className="flex flex-wrap gap-1 mb-3">
              {product.isOfficial && <ProductBadge type="official" />}
              {product.isTopSeller && <ProductBadge type="topSeller" />}
            </div>

            {/* Price + CTA */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-foreground">
                  {formatPrice(product.price)}
                </span>
                {product.comparePrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
              </div>

              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200",
                  added
                    ? "bg-emerald-500 text-white"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                aria-label="Añadir al carrito"
              >
                {added ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <ShoppingCart className="h-4 w-4" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
