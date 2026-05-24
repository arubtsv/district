"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const sportBgs: Record<string, string> = {
  futbol: "from-emerald-500 to-green-600",
  padel: "from-sky-500 to-blue-600",
  baloncesto: "from-orange-500 to-amber-600",
  ciclismo: "from-red-500 to-rose-600",
  tenis: "from-yellow-500 to-amber-600",
};

const sportImages: Record<string, string> = {
  futbol: "⚽",
  padel: "🏸",
  baloncesto: "🏀",
  ciclismo: "🚴",
  tenis: "🎾",
};

export function SportFilters() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-black text-foreground">Explora por Deporte</h2>
          <p className="text-muted-foreground mt-1 text-sm">Encuentra el club de tu deporte favorito</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {siteConfig.sports.map((sport, index) => (
            <motion.div
              key={sport.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href={`/deporte/${sport.id}`}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-gradient-to-br ${sportBgs[sport.id]} text-white shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[140px]`}
              >
                <span className="text-5xl group-hover:scale-110 transition-transform duration-200">
                  {sportImages[sport.id]}
                </span>
                <span className="font-bold text-sm">{sport.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
