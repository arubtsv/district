"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Shield, Zap } from "lucide-react";
import { SearchBar } from "./search-bar";
import { siteConfig } from "@/config/site";

const stats = [
  { label: "Clubes registrados", value: "1.247+", icon: Shield },
  { label: "Productos oficiales", value: "8.900+", icon: Star },
  { label: "Pedidos completados", value: "54.800+", icon: Zap },
];

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl opacity-50" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Pre-heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
        >
          <Trophy className="h-4 w-4 text-yellow-400" />
          <span className="text-white/90 text-sm font-medium">
            El marketplace oficial del deporte español
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-none tracking-tight mb-6"
        >
          Encuentra el
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-rose-400 to-orange-400">
            merchandising oficial
          </span>
          <br />
          de tu club
        </motion.h1>

        {/* Sub heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Desde equipos locales hasta clubes profesionales.
          <br className="hidden sm:block" />
          Apoya a tu club, lleva sus colores.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <SearchBar variant="hero" />
        </motion.div>

        {/* Sport filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-16"
        >
          {siteConfig.sports.map((sport, index) => (
            <motion.a
              key={sport.id}
              href={`/deporte/${sport.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200"
            >
              <span className="text-base">{sport.emoji}</span>
              <span>{sport.name}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center"
            >
              <Icon className="h-5 w-5 text-primary mx-auto mb-1.5" />
              <div className="text-2xl font-black text-white mb-0.5">{value}</div>
              <div className="text-xs text-white/60">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
