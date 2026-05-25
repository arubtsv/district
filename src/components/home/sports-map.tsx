"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const regionData: Record<string, { clubs: number; color: string; position: { x: string; y: string } }> = {
  "Madrid": { clubs: 247, color: "bg-red-500", position: { x: "42%", y: "48%" } },
  "Cataluña": { clubs: 189, color: "bg-blue-500", position: { x: "75%", y: "28%" } },
  "Andalucía": { clubs: 156, color: "bg-green-500", position: { x: "38%", y: "76%" } },
  "Valencia": { clubs: 134, color: "bg-orange-500", position: { x: "67%", y: "52%" } },
  "País Vasco": { clubs: 98, color: "bg-red-700", position: { x: "48%", y: "14%" } },
  "Galicia": { clubs: 87, color: "bg-blue-700", position: { x: "12%", y: "20%" } },
  "Castilla y León": { clubs: 76, color: "bg-yellow-600", position: { x: "35%", y: "32%" } },
  "Aragón": { clubs: 65, color: "bg-yellow-500", position: { x: "60%", y: "28%" } },
  "Castilla-La Mancha": { clubs: 54, color: "bg-purple-500", position: { x: "48%", y: "58%" } },
  "Murcia": { clubs: 43, color: "bg-orange-600", position: { x: "60%", y: "68%" } },
};

export function SportsMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <section className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-primary mb-2 uppercase tracking-widest"
            >
              Toda España
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-4xl font-black text-foreground mb-4"
            >
              Clubes en cada
              <br />
              rincón del país
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground leading-relaxed mb-8"
            >
              Desde la Ría de Vigo hasta las playas de Málaga. De los Pirineos al mar Mediterráneo.
              Encuentra el merchandising oficial de cualquier club de cualquier comunidad autónoma.
            </motion.p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Comunidades autónomas", value: "17" },
                { label: "Provincias cubiertas", value: "47+" },
                { label: "Ciudades con clubes", value: "312+" },
                { label: "Deportes", value: "5+" },
              ].map(({ label, value }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-2xl p-4"
                >
                  <div className="text-2xl font-black text-primary mb-1">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </motion.div>
              ))}
            </div>

            {/* Region list */}
            <div className="space-y-2">
              {siteConfig.regions.slice(0, 8).map((region) => (
                <Link
                  key={region}
                  href={`/clubes?region=${encodeURIComponent(region)}`}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-accent transition-colors group"
                  onMouseEnter={() => setHoveredRegion(region)}
                  onMouseLeave={() => setHoveredRegion(null)}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span className="text-sm font-medium">{region}</span>
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {regionData[region]?.clubs ?? Math.floor(Math.random() * 80 + 20)} clubes
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Map visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 aspect-[4/3] overflow-hidden shadow-xl">
              {/* Map outline placeholder */}
              <div className="absolute inset-4 rounded-2xl overflow-hidden">
                <svg
                  viewBox="0 0 200 160"
                  className="w-full h-full opacity-20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                >
                  {/* Simplified Spain outline */}
                  <path d="M30,60 Q20,40 35,25 Q55,10 80,15 Q110,8 130,18 Q160,12 175,30 Q185,45 180,65 Q188,75 182,90 Q175,105 165,112 Q155,125 140,130 Q120,140 100,135 Q80,145 60,138 Q45,130 40,118 Q30,105 25,90 Q18,78 30,60Z" />
                  <line x1="30" y1="60" x2="50" y2="55" />
                  <line x1="175" y1="30" x2="185" y2="20" />
                </svg>

                {/* Region bubbles */}
                {Object.entries(regionData).map(([region, data]) => (
                  <motion.div
                    key={region}
                    className="absolute"
                    style={{ left: data.position.x, top: data.position.y }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <div
                      className={cn(
                        "rounded-full flex items-center justify-center text-white text-[10px] font-bold cursor-pointer shadow-lg",
                        data.color,
                        hoveredRegion === region ? "w-12 h-12 -translate-x-6 -translate-y-6" : "w-8 h-8 -translate-x-4 -translate-y-4"
                      )}
                      style={{ transition: "all 0.2s" }}
                      title={`${region}: ${data.clubs} clubes`}
                    >
                      {data.clubs}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-background/80 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3 flex-wrap">
                  {siteConfig.sports.map((sport) => (
                    <div key={sport.id} className="flex items-center gap-1 text-xs">
                      <span>{sport.emoji}</span>
                      <span className="text-muted-foreground">{sport.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
