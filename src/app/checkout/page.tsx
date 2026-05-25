import type { Metadata } from "next";
import { CheckoutForm } from "@/components/cart/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Finaliza tu pedido de merchandising deportivo oficial",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen py-8 bg-muted/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-black mb-8">Finalizar Pedido</h1>
        <CheckoutForm />
      </div>
    </div>
  );
}
