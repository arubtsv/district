# FanZone España 🏆

**El marketplace líder de merchandising deportivo en España**

Un marketplace centralizado donde clubes deportivos de toda España pueden vender su equipación oficial y los aficionados pueden descubrir, comparar y comprar con un solo checkout.

---

## ✨ Características

### Para Fans
- 🔍 **Buscador inteligente** con autocompletado por club, ciudad, deporte, provincia y comunidad autónoma
- 🛒 **Carrito multi-club** — compra en varios clubes y paga desde un único checkout
- 💳 **Checkout moderno** tipo Shopify con Stripe, Apple Pay y Google Pay preparados
- ❤️ **Favoritos** y seguimiento de clubes
- 📦 **Seguimiento de pedidos** en tiempo real
- 🌙 **Modo oscuro/claro** completamente soportado

### Para Clubes
- 🏟️ **Página personalizada** con logo, banner, historia y redes sociales
- 📊 **Dashboard de ventas** con analíticas y gestión de pedidos
- 📦 **Gestión de stock** y variantes (tallas, colores)
- 🔰 **Badges oficiales**: Oficial · Top Ventas · Edición Limitada · Club Verificado

### Plataforma
- 🌍 Cobertura de toda España — 17 comunidades autónomas, 47+ provincias
- ⚽🏀🚴🎾🏸 Fútbol · Baloncesto · Ciclismo · Tenis · Pádel
- 🏅 Clubes profesionales, amateur, escuelas deportivas y divisiones inferiores

---

## 🛠️ Stack Tecnológico

| Área | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript |
| Estilos | TailwindCSS v4 |
| Componentes | Radix UI + componentes propios |
| Estado global | Zustand + persist |
| Formularios | React Hook Form + Zod |
| Base de datos | PostgreSQL |
| ORM | Prisma 7 |
| Autenticación | NextAuth / Auth.js v5 |
| Pagos | Stripe |
| Imágenes | Cloudinary |
| Animaciones | Framer Motion |
| Hosting | Vercel + Railway/Supabase |

---

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- PostgreSQL 14+
- npm o yarn

### Instalación

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd fanzone

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales

# 4. Generar el cliente Prisma
npm run db:generate

# 5. Migrar la base de datos
npm run db:migrate

# 6. Poblar con datos de prueba
npm run db:seed

# 7. Iniciar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📁 Estructura del Proyecto

```
fanzone/
├── prisma/
│   ├── schema.prisma          # Modelos de base de datos
│   ├── seed.ts                # Datos de prueba iniciales
│   └── migrations/            # Historial de migraciones
├── prisma.config.ts           # Configuración Prisma 7
├── src/
│   ├── app/                   # App Router de Next.js
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Home page
│   │   ├── club/[slug]/       # Página de cada club
│   │   ├── producto/[slug]/   # Página de cada producto
│   │   ├── deporte/[sport]/   # Página por deporte
│   │   ├── clubes/            # Listado de clubes
│   │   ├── productos/         # Catálogo de productos
│   │   ├── buscar/            # Búsqueda global
│   │   ├── checkout/          # Proceso de compra
│   │   ├── auth/              # Login y registro
│   │   ├── perfil/            # Perfil de usuario
│   │   └── api/               # API Routes
│   │       ├── clubs/         # GET /api/clubs
│   │       ├── products/      # GET /api/products
│   │       └── search/        # GET /api/search
│   ├── components/
│   │   ├── auth/              # Login, registro
│   │   ├── cart/              # Checkout, carrito
│   │   ├── club/              # ClubCard
│   │   ├── home/              # Hero, Search, FeaturedClubs, Map
│   │   ├── layout/            # Navbar, Footer, CartDrawer
│   │   ├── product/           # ProductCard, ProductDetail
│   │   └── ui/                # Badge, Button, Input, Skeleton, Rating
│   ├── config/
│   │   └── site.ts            # ⚡ Configuración global (nombre, colores, deportes)
│   ├── data/
│   │   └── mock.ts            # Datos de prueba para desarrollo
│   ├── generated/
│   │   └── prisma/            # Cliente Prisma generado
│   ├── hooks/                 # Custom hooks
│   ├── lib/
│   │   ├── db.ts              # Conexión a base de datos
│   │   └── utils.ts           # Utilidades (formatPrice, slugify...)
│   ├── store/
│   │   ├── cart.ts            # Estado del carrito (Zustand)
│   │   └── search.ts          # Estado de búsqueda
│   └── types/
│       └── index.ts           # Tipos TypeScript globales
├── .env.example               # Plantilla de variables de entorno
└── next.config.ts             # Configuración Next.js
```

---

## ⚙️ Variables de Entorno

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Base de datos
DATABASE_URL="postgresql://user:password@localhost:5432/fanzone_db"

# Autenticación (NextAuth)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secreto-muy-seguro

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
```

---

## 🗄️ Modelos de Base de Datos

```
User           — Clientes, propietarios de clubes y admins
Club           — Cada club con su tienda y configuración
Sport          — Deporte (Fútbol, Baloncesto, etc.)
Category       — Categorías de productos
Product        — Artículos del catálogo
ProductImage   — Galería de imágenes
ProductVariant — Tallas, colores, etc.
Inventory      — Control de stock por variante
Order          — Pedidos de clientes
OrderItem      — Líneas de pedido
Payment        — Registros de pago (Stripe)
Address        — Direcciones de envío
Shipment       — Seguimiento de envíos
Favorite       — Productos guardados
Review         — Valoraciones y reseñas
ClubMember     — Gestores de cada club
```

---

## 🎨 Personalización

El nombre de la plataforma y los colores se controlan desde **`src/config/site.ts`**:

```typescript
export const siteConfig = {
  name: "FanZone España",        // ← Cambia el nombre aquí
  primaryColor: "#E63946",       // ← Color principal
  secondaryColor: "#1D3557",     // ← Color secundario
  // ...
}
```

---

## 🔑 Comandos útiles

```bash
npm run dev           # Servidor de desarrollo
npm run build         # Build de producción
npm run start         # Iniciar producción
npm run lint          # Linting

npm run db:generate   # Generar cliente Prisma
npm run db:push       # Push del schema a la DB
npm run db:migrate    # Crear y aplicar migración
npm run db:seed       # Poblar con datos iniciales
npm run db:studio     # Prisma Studio (UI de la DB)
```

---

## 🚢 Despliegue

### Vercel (Frontend)

```bash
# Conectar repositorio en vercel.com
# Configurar variables de entorno en Settings > Environment Variables
vercel --prod
```

### Railway (Base de datos)

```bash
# Crear PostgreSQL en railway.app
# Copiar DATABASE_URL al proyecto de Vercel
```

### Supabase (Alternativa)

```bash
# Crear proyecto en supabase.com
# Usar la connection string en DATABASE_URL
```

---

## 🧪 Cuentas de Prueba

Tras ejecutar `npm run db:seed`:

| Rol | Email | Contraseña |
|-----|-------|-----------|
| Admin | admin@fanzone.es | admin123456 |
| Club Owner | deportivo@fanzone.es | demo123456 |

---

## 🔮 Roadmap / Funcionalidades Futuras

La arquitectura está preparada para:

- [ ] App móvil (React Native / Expo)
- [ ] Suscripción premium para clubes
- [ ] Chat comprador ↔ club
- [ ] NFTs / tickets digitales
- [ ] Expansión internacional
- [ ] Multiidioma (i18n)
- [ ] Programa de afiliados
- [ ] Drops y ediciones limitadas con countdown
- [ ] Integración con logística (Correos, MRW, SEUR)
- [ ] Búsqueda avanzada con Algolia / ElasticSearch

---

## 📄 Licencia

MIT — Siéntete libre de adaptar este proyecto para tu marketplace.

---

**Hecho con ❤️ para el deporte español**
