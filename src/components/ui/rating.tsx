"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  count?: number;
  className?: string;
}

const sizeMap = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function Rating({ value, max = 5, size = "sm", showValue = false, count, className }: RatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              sizeMap[size],
              i < Math.floor(value)
                ? "fill-yellow-400 text-yellow-400"
                : i < value
                ? "fill-yellow-200 text-yellow-400"
                : "fill-muted text-muted-foreground"
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-medium text-foreground">{value.toFixed(1)}</span>
      )}
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">({count})</span>
      )}
    </div>
  );
}
