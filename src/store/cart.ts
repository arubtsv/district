import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types";
import { siteConfig } from "@/config/site";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed
  itemCount: () => number;
  subtotal: () => number;
  shippingCost: () => number;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const existing = get().items.find(
          (item) =>
            item.productId === newItem.productId &&
            JSON.stringify(item.selectedVariants) ===
              JSON.stringify(newItem.selectedVariants)
        );

        if (existing) {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === existing.id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            ),
            isOpen: true,
          }));
        } else {
          set((state) => ({
            items: [...state.items, newItem],
            isOpen: true,
          }));
        }
      },

      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      shippingCost: () => {
        const subtotal = get().subtotal();
        if (subtotal === 0) return 0;
        return subtotal >= siteConfig.marketplace.freeShippingThreshold
          ? 0
          : siteConfig.marketplace.shippingBaseRate;
      },

      total: () => get().subtotal() + get().shippingCost(),
    }),
    {
      name: "fanzone-cart",
      skipHydration: true,
    }
  )
);
