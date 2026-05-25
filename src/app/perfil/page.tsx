import type { Metadata } from "next";
import Link from "next/link";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ShoppingBag,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Mi Perfil",
};

const menuItems = [
  { icon: ShoppingBag, label: "Mis Pedidos", href: "/perfil/pedidos", desc: "Ver historial de compras" },
  { icon: Heart, label: "Favoritos", href: "/perfil/favoritos", desc: "Productos guardados" },
  { icon: MapPin, label: "Direcciones", href: "/perfil/direcciones", desc: "Gestionar direcciones" },
  { icon: Star, label: "Mis Reseñas", href: "/perfil/resenas", desc: "Valoraciones de productos" },
  { icon: Settings, label: "Configuración", href: "/perfil/configuracion", desc: "Ajustes de cuenta" },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl font-black mb-6">Mi Perfil</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile card */}
          <div className="md:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h2 className="font-bold text-lg">Juan García</h2>
              <p className="text-sm text-muted-foreground mt-0.5">juan@email.com</p>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <div className="font-bold text-xl">12</div>
                    <div className="text-xs text-muted-foreground">Pedidos</div>
                  </div>
                  <div>
                    <div className="font-bold text-xl">5</div>
                    <div className="text-xs text-muted-foreground">Favoritos</div>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                <Link href="/perfil/configuracion">
                  <Settings className="h-3.5 w-3.5" />
                  Editar perfil
                </Link>
              </Button>
            </div>
          </div>

          {/* Menu */}
          <div className="md:col-span-2 space-y-2">
            {menuItems.map(({ icon: Icon, label, href, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:bg-accent transition-colors group"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <Package className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            ))}

            <button className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:bg-destructive/5 hover:border-destructive/30 transition-colors group w-full text-left">
              <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0 group-hover:bg-destructive/20 transition-colors">
                <LogOut className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-destructive">Cerrar sesión</p>
                <p className="text-xs text-muted-foreground">Salir de tu cuenta</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
