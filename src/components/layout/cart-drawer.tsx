"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, shippingCost, total } =
    useCartStore();

  const sub = subtotal();
  const shipping = shippingCost();
  const tot = total();
  const remaining = siteConfig.marketplace.freeShippingThreshold - sub;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="font-bold text-lg">Mi Carrito</h2>
                {items.length > 0 && (
                  <span className="text-sm text-muted-foreground">({items.length} artículos)</span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free shipping bar */}
            {sub > 0 && sub < siteConfig.marketplace.freeShippingThreshold && (
              <div className="px-6 py-3 bg-muted">
                <p className="text-xs text-muted-foreground mb-1.5">
                  ¡Añade <strong>{formatPrice(remaining)}</strong> más para envío gratis
                </p>
                <div className="w-full bg-border rounded-full h-1.5">
                  <div
                    className="h-1.5 bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((sub / siteConfig.marketplace.freeShippingThreshold) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {sub >= siteConfig.marketplace.freeShippingThreshold && sub > 0 && (
              <div className="px-6 py-3 bg-emerald-50 dark:bg-emerald-900/20">
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  ✓ ¡Tienes envío gratuito!
                </p>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                    <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Tu carrito está vacío</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Descubre el merchandising oficial de tus clubes favoritos
                    </p>
                  </div>
                  <Button onClick={closeCart} asChild>
                    <Link href="/productos">Ver productos</Link>
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-3"
                  >
                    {/* Image */}
                    <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          Sin imagen
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/club/${item.clubSlug}`}
                        className="text-[11px] text-muted-foreground hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.clubName}
                      </Link>
                      <p className="text-sm font-medium text-foreground line-clamp-2 leading-tight mt-0.5">
                        {item.name}
                      </p>
                      {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {Object.entries(item.selectedVariants)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(", ")}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm font-bold text-primary">
                          {formatPrice(item.price)}
                        </p>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-6 w-6 rounded-md border border-border flex items-center justify-center hover:bg-accent transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-6 w-6 rounded-md border border-border flex items-center justify-center hover:bg-accent transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="h-6 w-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors ml-1"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(sub)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span className={shipping === 0 ? "font-medium text-emerald-600" : "font-medium"}>
                      {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-base pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(tot)}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" asChild onClick={closeCart}>
                  <Link href="/checkout">
                    Ir al Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <button
                  onClick={closeCart}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Seguir comprando
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
