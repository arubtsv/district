"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section className="py-16 bg-primary/5 border-y border-primary/10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 mb-6">
            <Mail className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-foreground mb-3">
            Mantente al día
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Recibe notificaciones de nuevos clubes, drops exclusivos y ofertas especiales
            directamente en tu bandeja de entrada.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 text-emerald-600 dark:text-emerald-400"
            >
              <CheckCircle2 className="h-6 w-6" />
              <p className="font-semibold">¡Perfecto! Te hemos añadido a nuestra lista.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" loading={loading}>
                Suscribirme
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            Sin spam. Puedes darte de baja cuando quieras.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
