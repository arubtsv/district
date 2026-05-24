"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Package } from "lucide-react";
import { Club } from "@/types";
import { cn, pluralize } from "@/lib/utils";
import { ProductBadge } from "@/components/ui/badge";

interface ClubCardProps {
  club: Club;
  className?: string;
}

export function ClubCard({ club, className }: ClubCardProps) {
  const sportColor: Record<string, string> = {
    futbol: "from-green-600 to-emerald-400",
    baloncesto: "from-orange-600 to-amber-400",
    ciclismo: "from-red-600 to-rose-400",
    padel: "from-blue-600 to-sky-400",
    tenis: "from-yellow-600 to-amber-400",
  };

  const gradient = sportColor[club.sport.slug] ?? "from-slate-600 to-slate-400";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn("group", className)}
    >
      <Link href={`/club/${club.slug}`}>
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          {/* Banner */}
          <div className="relative h-28 overflow-hidden">
            {club.banner ? (
              <Image
                src={club.banner}
                alt={`Banner ${club.name}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            ) : (
              <div className={cn("w-full h-full bg-gradient-to-r", gradient)} />
            )}
            {/* Sport badge */}
            <div className="absolute top-3 right-3">
              <span className="text-lg">{club.sport.emoji}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 -mt-6 relative">
            {/* Logo */}
            <div className="relative h-14 w-14 rounded-xl border-2 border-background shadow-sm overflow-hidden bg-white mb-3">
              {club.logo ? (
                <Image
                  src={club.logo}
                  alt={`Logo ${club.name}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className={cn("w-full h-full flex items-center justify-center text-white text-lg font-bold bg-gradient-to-br", gradient)}>
                  {club.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Name + Verified */}
            <div className="flex items-start gap-2 mb-1">
              <h3 className="text-sm font-bold text-foreground leading-tight line-clamp-1 flex-1">
                {club.name}
              </h3>
              {club.verified && (
                <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
              )}
            </div>

            {/* Location */}
            {club.city && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <MapPin className="h-3 w-3" />
                <span>
                  {club.city}
                  {club.region && `, ${club.region}`}
                </span>
              </div>
            )}

            {/* Description */}
            {club.shortDesc && (
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                {club.shortDesc}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Package className="h-3 w-3" />
                <span>
                  {club._count?.products ?? 0}{" "}
                  {pluralize(club._count?.products ?? 0, "producto", "productos")}
                </span>
              </div>
              {club.verified && <ProductBadge type="verified" size="sm" />}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
