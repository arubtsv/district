"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Trophy,
  Store,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    label: "Deportes",
    href: "/deportes",
    children: siteConfig.sports.map((s) => ({
      label: `${s.emoji} ${s.name}`,
      href: `/deporte/${s.id}`,
    })),
  },
  { label: "Clubes", href: "/clubes" },
  { label: "Productos", href: "/productos" },
  { label: "Equipación", href: "/productos?categoria=equipacion" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const { itemCount, toggleCart } = useCartStore();
  const count = itemCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex items-center gap-1.5">
                <Trophy className="h-6 w-6 text-primary" />
                <span className="font-black text-xl tracking-tight">
                  <span className="text-primary">Fan</span>
                  <span className="text-foreground">Zone</span>
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-medium hidden sm:block">España</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium",
                      "text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
                    )}
                  >
                    {link.label}
                    {link.children && <ChevronDown className="h-3 w-3" />}
                  </Link>

                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-xl shadow-lg overflow-hidden"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-popover-foreground hover:bg-accent transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <Link
                href="/buscar"
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Search className="h-4 w-4" />
                <span className="hidden lg:block">Buscar...</span>
              </Link>

              {/* Theme toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Cambiar tema"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </button>

              {/* User */}
              <Link
                href="/perfil"
                className="hidden sm:flex p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Mi perfil"
              >
                <User className="h-4 w-4" />
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label={`Carrito (${count} artículos)`}
              >
                <ShoppingCart className="h-4 w-4" />
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {count > 9 ? "9+" : count}
                  </motion.span>
                )}
              </button>

              {/* Club CTA */}
              <Button size="sm" className="hidden md:flex gap-1" asChild>
                <Link href="/clubes/registro">
                  <Store className="h-3.5 w-3.5" />
                  <span>Mi Club</span>
                </Link>
              </Button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Menú"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 inset-x-0 z-40 bg-background border-b border-border md:hidden overflow-hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-border space-y-2">
                <Link
                  href="/buscar"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  <Search className="h-4 w-4" />
                  Buscar
                </Link>
                <Link
                  href="/perfil"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
                >
                  <User className="h-4 w-4" />
                  Mi perfil
                </Link>
                <Button className="w-full" asChild>
                  <Link href="/clubes/registro" onClick={() => setMobileOpen(false)}>
                    <Store className="h-4 w-4" />
                    Registrar mi Club
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
