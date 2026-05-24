import Link from "next/link";
import { Trophy, Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-md mx-auto px-4 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-3xl bg-primary/10 mb-6">
          <Trophy className="h-12 w-12 text-primary" />
        </div>

        {/* 404 */}
        <div className="text-8xl font-black text-primary/20 leading-none mb-4">404</div>

        <h1 className="text-2xl font-black text-foreground mb-2">Página no encontrada</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Parece que esta página no existe o ha sido movida.
          Puede que el club o producto que buscas ya no esté disponible.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/buscar">
              <Search className="h-4 w-4" />
              Buscar productos
            </Link>
          </Button>
        </div>

        {/* Popular links */}
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3">O explora estas secciones</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: "⚽ Fútbol", href: "/deporte/futbol" },
              { label: "🏀 Baloncesto", href: "/deporte/baloncesto" },
              { label: "🚴 Ciclismo", href: "/deporte/ciclismo" },
              { label: "Clubes", href: "/clubes" },
              { label: "Productos", href: "/productos" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 text-sm bg-muted rounded-lg hover:bg-accent transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
