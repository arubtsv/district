"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Truck, CheckCircle2, ArrowLeft, Lock } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const checkoutSchema = z.object({
  email: z.string().email("Email inválido"),
  firstName: z.string().min(2, "Mínimo 2 caracteres"),
  lastName: z.string().min(2, "Mínimo 2 caracteres"),
  phone: z.string().optional(),
  line1: z.string().min(5, "Dirección requerida"),
  line2: z.string().optional(),
  city: z.string().min(2, "Ciudad requerida"),
  province: z.string().min(2, "Provincia requerida"),
  postalCode: z.string().regex(/^\d{5}$/, "Código postal inválido (5 dígitos)"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const steps = [
  { id: 1, label: "Datos de contacto" },
  { id: 2, label: "Dirección de envío" },
  { id: 3, label: "Pago" },
];

export function CheckoutForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const { items, subtotal, shippingCost, total, clearCart } = useCartStore();
  const sub = subtotal();
  const shipping = shippingCost();
  const tot = total();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setOrderComplete(true);
    clearCart();
    setIsSubmitting(false);
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="text-center py-16">
        <p className="text-xl font-bold mb-4">Tu carrito está vacío</p>
        <Button asChild>
          <Link href="/productos">Ver productos</Link>
        </Button>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center py-16"
      >
        <div className="h-24 w-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-12 w-12 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-black mb-2">¡Pedido confirmado!</h2>
        <p className="text-muted-foreground mb-2">
          Recibirás un email de confirmación con los detalles de tu pedido.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Nº de pedido: <strong>FZ-{Date.now().toString().slice(-8)}</strong>
        </p>
        <div className="flex gap-3 justify-center">
          <Button asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/perfil/pedidos">Mis pedidos</Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Form */}
      <div className="lg:col-span-3 space-y-6">
        {/* Steps */}
        <div className="flex items-center gap-2">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 cursor-pointer ${step >= s.id ? "text-foreground" : "text-muted-foreground"}`}
                onClick={() => step > s.id && setStep(s.id)}
              >
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    step > s.id
                      ? "bg-emerald-500 text-white"
                      : step === s.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s.id ? <CheckCircle2 className="h-4 w-4" /> : s.id}
                </div>
                <span className="text-sm font-medium hidden sm:block">{s.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-px ${step > s.id ? "bg-emerald-500" : "bg-border"} w-8 sm:w-16`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Contact */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-border rounded-2xl p-6 space-y-4"
            >
              <h2 className="font-bold text-lg">Datos de contacto</h2>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email *</label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="tu@email.com"
                  error={errors.email?.message}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Nombre *</label>
                  <Input
                    {...register("firstName")}
                    placeholder="Nombre"
                    error={errors.firstName?.message}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Apellidos *</label>
                  <Input
                    {...register("lastName")}
                    placeholder="Apellidos"
                    error={errors.lastName?.message}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Teléfono (opcional)</label>
                <Input {...register("phone")} type="tel" placeholder="+34 600 000 000" />
              </div>
              <Button type="button" className="w-full" onClick={() => setStep(2)}>
                Continuar con el envío
              </Button>
            </motion.div>
          )}

          {/* Step 2: Shipping address */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-border rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <h2 className="font-bold text-lg">Dirección de envío</h2>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Dirección *</label>
                <Input
                  {...register("line1")}
                  placeholder="Calle, número, piso"
                  error={errors.line1?.message}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Información adicional</label>
                <Input {...register("line2")} placeholder="Escalera, puerta, apartamento..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Ciudad *</label>
                  <Input
                    {...register("city")}
                    placeholder="Ciudad"
                    error={errors.city?.message}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Código Postal *</label>
                  <Input
                    {...register("postalCode")}
                    placeholder="28001"
                    error={errors.postalCode?.message}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Provincia *</label>
                <select
                  {...register("province")}
                  className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Selecciona provincia</option>
                  {siteConfig.regions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                {errors.province && (
                  <p className="mt-1 text-xs text-destructive">{errors.province.message}</p>
                )}
              </div>
              <Button type="button" className="w-full" onClick={() => setStep(3)}>
                Continuar al pago
              </Button>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <h2 className="font-bold text-lg">Método de pago</h2>
                </div>
                <div className="mt-4 p-4 border-2 border-primary rounded-xl bg-primary/5">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Tarjeta de crédito / débito</span>
                    <div className="ml-auto flex items-center gap-1">
                      {["Visa", "MC", "Amex"].map((card) => (
                        <span key={card} className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono">
                          {card}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stripe mock fields */}
                <div className="mt-4 p-4 bg-muted/50 rounded-xl space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Número de tarjeta</label>
                    <div className="h-10 bg-background rounded-lg border border-border px-3 flex items-center text-sm text-muted-foreground">
                      4242 4242 4242 4242 (modo demo)
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Vencimiento</label>
                      <div className="h-10 bg-background rounded-lg border border-border px-3 flex items-center text-sm text-muted-foreground">
                        MM / AA
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">CVC</label>
                      <div className="h-10 bg-background rounded-lg border border-border px-3 flex items-center text-sm text-muted-foreground">
                        •••
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Pago seguro con cifrado SSL. Procesado por Stripe.</span>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
                <Lock className="h-4 w-4" />
                Confirmar pedido · {formatPrice(tot)}
              </Button>
            </motion.div>
          )}
        </form>
      </div>

      {/* Order summary */}
      <div className="lg:col-span-2">
        <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
          <h2 className="font-bold text-lg mb-4">Resumen del pedido</h2>

          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                {item.image && (
                  <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                    <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                      {item.quantity}
                    </div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{item.clubName}</p>
                  <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                  <p className="text-sm font-bold text-primary mt-0.5">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(sub)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Truck className="h-3.5 w-3.5" />
                Envío
              </span>
              <span className={shipping === 0 ? "text-emerald-600 font-medium" : ""}>
                {shipping === 0 ? "Gratis" : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex items-center justify-between font-bold text-base pt-2 border-t border-border">
              <span>Total</span>
              <span className="text-primary">{formatPrice(tot)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
