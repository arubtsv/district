"use client";

import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { useCartStore } from "@/store/cart";

interface ProvidersProps {
  children: React.ReactNode;
}

function StoreHydrator() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return null;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
    >
      <div className="contents">
        <StoreHydrator />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "!bg-card !text-foreground !border !border-border !shadow-lg",
            duration: 3000,
          }}
        />
      </div>
    </ThemeProvider>
  );
}
