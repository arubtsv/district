"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Users, Trophy, ArrowRight, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Store,
    title: "Tu propia tienda",
    description: "Crea tu página personalizada con tus productos, logo y historia del club en minutos.",
  },
  {
    icon: Users,
    title: "Llega a más fans",
    description: "Conecta con aficionados de toda España que buscan exactamente lo que tú ofreces.",
  },
  {
    icon: Trophy,
    title: "Gestiona todo",
    description: "Dashboard completo con analíticas, gestión de pedidos y stock en un solo lugar.",
  },
];

export function LocalClubCTA() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 p-8 sm:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6"
                >
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="text-primary text-sm font-semibold">Para tu club local</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4"
                >
                  Apoya a tu
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">
                    club local
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-white/70 text-lg leading-relaxed mb-8"
                >
                  Cada compra ayuda a financiar el deporte base, las academias juveniles y los sueños
                  de cientos de deportistas locales en toda España.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Button size="lg" asChild>
                    <Link href="/clubes/registro">
                      <Store className="h-4 w-4" />
                      Registrar mi Club
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
                    <Link href="/como-funciona">
                      Cómo funciona
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex gap-4 p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
                  >
                    <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">{benefit.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Testimonial */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="p-5 bg-primary/20 border border-primary/30 rounded-2xl"
                >
                  <p className="text-white/90 text-sm italic leading-relaxed mb-3">
                    "Gracias a FanZone, nuestro club amateur pudo financiar la nueva equipación para
                    todas las categorías. Los fans de la ciudad nos apoyan de una forma que nunca
                    imaginamos."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                      JM
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">José Manuel García</p>
                      <p className="text-white/50 text-xs">Presidente, CD Rápido de Bouzas</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
