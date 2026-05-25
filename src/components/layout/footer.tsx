import Link from "next/link";
import { Trophy, Mail, MapPin } from "lucide-react";
import { IconInstagram, IconTwitterX, IconFacebook, IconYoutube } from "@/components/ui/social-icons";
import { siteConfig } from "@/config/site";

const footerLinks = {
  marketplace: {
    title: "Marketplace",
    links: [
      { label: "Cómo funciona", href: "/como-funciona" },
      { label: "Clubes destacados", href: "/clubes" },
      { label: "Productos populares", href: "/productos" },
      { label: "Ediciones limitadas", href: "/productos?badge=limited" },
      { label: "Nuevos productos", href: "/productos?badge=new" },
    ],
  },
  clubs: {
    title: "Para Clubes",
    links: [
      { label: "Registrar mi club", href: "/clubes/registro" },
      { label: "Panel de club", href: "/club/dashboard" },
      { label: "Comisiones y precios", href: "/clubes/precios" },
      { label: "Guía para vendedores", href: "/clubes/guia" },
      { label: "Historias de éxito", href: "/clubes/historias" },
    ],
  },
  support: {
    title: "Soporte",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Centro de ayuda", href: "/ayuda" },
      { label: "Devoluciones", href: "/devoluciones" },
      { label: "Seguimiento de pedidos", href: "/pedidos/seguimiento" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Política de privacidad", href: "/privacidad" },
      { label: "Términos y condiciones", href: "/terminos" },
      { label: "Política de cookies", href: "/cookies" },
      { label: "Aviso legal", href: "/aviso-legal" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Trophy className="h-7 w-7 text-primary" />
              <span className="font-black text-2xl">
                <span className="text-primary">Fan</span>Zone
              </span>
            </Link>
            <p className="text-sm text-background/70 leading-relaxed mb-6">
              El marketplace líder de merchandising deportivo en España. Conectamos aficionados con sus clubes favoritos.
            </p>

            {/* Contact */}
            <div className="space-y-2">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors"
              >
                <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                {siteConfig.contact.email}
              </a>
              <div className="flex items-center gap-2 text-sm text-background/70">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                España
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: IconInstagram, href: siteConfig.social.instagram, label: "Instagram" },
                { Icon: IconTwitterX, href: siteConfig.social.twitter, label: "Twitter/X" },
                { Icon: IconFacebook, href: siteConfig.social.facebook, label: "Facebook" },
                { Icon: IconYoutube, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-lg bg-background/10 flex items-center justify-center text-background/70 hover:bg-primary hover:text-white transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm mb-4">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/65 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sports section */}
        <div className="py-6 border-t border-background/20">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-background/50 mr-2">Deportes:</span>
            {siteConfig.sports.map((sport) => (
              <Link
                key={sport.id}
                href={`/deporte/${sport.id}`}
                className="text-xs text-background/60 hover:text-background transition-colors flex items-center gap-1"
              >
                <span>{sport.emoji}</span>
                <span>{sport.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-background/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/50">
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <img
              src="https://placehold.co/40x25/ffffff/000000?text=Visa"
              alt="Visa"
              className="h-5 opacity-60 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://placehold.co/50x25/ffffff/000000?text=MC"
              alt="Mastercard"
              className="h-5 opacity-60 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://placehold.co/50x25/003087/ffffff?text=PayPal"
              alt="PayPal"
              className="h-5 opacity-60 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://placehold.co/50x25/000000/ffffff?text=Apple"
              alt="Apple Pay"
              className="h-5 opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
