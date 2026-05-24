"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const suggestions = [
  "Real Madrid",
  "Valencia Basket",
  "Pádel Barcelona",
  "Bufanda Deportivo",
  "Camiseta ciclismo Galicia",
  "Sudadera Betis",
  "Gorra Villarreal",
  "Equipación tenis Madrid",
];

const trendingSearches = [
  { label: "Camisetas temporada 24/25", icon: "🔥" },
  { label: "Baloncesto Liga ACB", icon: "🏀" },
  { label: "Clubes de Cataluña", icon: "📍" },
  { label: "Equipación ciclismo", icon: "🚴" },
  { label: "Ediciones limitadas", icon: "⭐" },
];

interface SearchBarProps {
  variant?: "hero" | "default";
  className?: string;
}

export function SearchBar({ variant = "default", className }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.length > 1) {
      setFilteredSuggestions(
        suggestions.filter((s) =>
          s.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5)
      );
    } else {
      setFilteredSuggestions([]);
    }
  }, [query]);

  const handleSearch = (searchQuery?: string) => {
    const q = searchQuery ?? query;
    if (!q.trim()) return;
    router.push(`/buscar?q=${encodeURIComponent(q.trim())}`);
    setIsFocused(false);
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl transition-all duration-300",
          variant === "hero"
            ? "bg-white/95 dark:bg-card shadow-2xl shadow-black/20 p-2"
            : "bg-muted border border-border p-1.5",
          isFocused && variant === "hero" && "ring-2 ring-primary/50"
        )}
      >
        <div className="flex-1 flex items-center gap-3 px-2">
          <Search
            className={cn(
              "h-5 w-5 flex-shrink-0 transition-colors",
              isFocused ? "text-primary" : "text-muted-foreground"
            )}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={handleKeyDown}
            placeholder="Busca clubes, deportes, ciudades, productos..."
            className={cn(
              "flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground",
              variant === "hero" ? "text-base py-2" : "text-sm py-1"
            )}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sport filter */}
        <select
          className={cn(
            "hidden sm:block bg-muted text-foreground text-sm rounded-xl border-none outline-none cursor-pointer",
            variant === "hero" ? "px-3 py-2 bg-slate-100 dark:bg-slate-800" : "px-2 py-1"
          )}
        >
          <option value="">Todos los deportes</option>
          {siteConfig.sports.map((s) => (
            <option key={s.id} value={s.id}>
              {s.emoji} {s.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => handleSearch()}
          className={cn(
            "flex items-center gap-2 font-semibold rounded-xl transition-all duration-200",
            "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95",
            variant === "hero" ? "px-6 py-3 text-sm" : "px-4 py-2 text-xs"
          )}
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:block">Buscar</span>
        </button>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            {filteredSuggestions.length > 0 ? (
              <div className="p-2">
                <p className="text-xs text-muted-foreground px-3 py-1.5 font-medium">Sugerencias</p>
                {filteredSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSearch(suggestion)}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-accent text-left text-sm transition-colors"
                  >
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {suggestion.split(new RegExp(`(${query})`, "gi")).map((part, i) =>
                        part.toLowerCase() === query.toLowerCase() ? (
                          <strong key={i} className="text-primary">
                            {part}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </span>
                    <ChevronRight className="h-3 w-3 text-muted-foreground ml-auto" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-3 font-medium flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Búsquedas populares
                </p>
                <div className="space-y-1">
                  {trendingSearches.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleSearch(item.label)}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-accent text-left text-sm transition-colors"
                    >
                      <span className="text-base">{item.icon}</span>
                      <span className="text-foreground">{item.label}</span>
                      <ChevronRight className="h-3 w-3 text-muted-foreground ml-auto" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
