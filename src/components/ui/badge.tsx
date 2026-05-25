"use client";

import { cn } from "@/lib/utils";
import { BadgeType, siteConfig } from "@/config/site";

interface BadgeProps {
  type: BadgeType;
  className?: string;
  size?: "sm" | "md";
}

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  red: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

export function ProductBadge({ type, className, size = "sm" }: BadgeProps) {
  const badge = siteConfig.badges[type];
  const color = colorMap[badge.color] ?? colorMap.blue;

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-full",
        size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1",
        color,
        className
      )}
    >
      {badge.label}
    </span>
  );
}

interface SimpleBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "destructive";
  className?: string;
}

const variantMap = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border border-border text-foreground",
  destructive: "bg-destructive text-white",
};

export function Badge({ children, variant = "default", className }: SimpleBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-semibold rounded-full px-2.5 py-0.5",
        variantMap[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
