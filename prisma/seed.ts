import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? "" });

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Sports
  const sports = await Promise.all([
    prisma.sport.upsert({
      where: { slug: "futbol" },
      update: {},
      create: { name: "Fútbol", slug: "futbol", emoji: "⚽", order: 1 },
    }),
    prisma.sport.upsert({
      where: { slug: "padel" },
      update: {},
      create: { name: "Pádel", slug: "padel", emoji: "🏸", order: 2 },
    }),
    prisma.sport.upsert({
      where: { slug: "baloncesto" },
      update: {},
      create: { name: "Baloncesto", slug: "baloncesto", emoji: "🏀", order: 3 },
    }),
    prisma.sport.upsert({
      where: { slug: "ciclismo" },
      update: {},
      create: { name: "Ciclismo", slug: "ciclismo", emoji: "🚴", order: 4 },
    }),
    prisma.sport.upsert({
      where: { slug: "tenis" },
      update: {},
      create: { name: "Tenis", slug: "tenis", emoji: "🎾", order: 5 },
    }),
  ]);

  console.log(`✅ Created ${sports.length} sports`);

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "camisetas" },
      update: {},
      create: { name: "Camisetas", slug: "camisetas", order: 1 },
    }),
    prisma.category.upsert({
      where: { slug: "bufandas" },
      update: {},
      create: { name: "Bufandas", slug: "bufandas", order: 2 },
    }),
    prisma.category.upsert({
      where: { slug: "gorras" },
      update: {},
      create: { name: "Gorras", slug: "gorras", order: 3 },
    }),
    prisma.category.upsert({
      where: { slug: "sudaderas" },
      update: {},
      create: { name: "Sudaderas", slug: "sudaderas", order: 4 },
    }),
    prisma.category.upsert({
      where: { slug: "accesorios" },
      update: {},
      create: { name: "Accesorios", slug: "accesorios", order: 5 },
    }),
    prisma.category.upsert({
      where: { slug: "equipacion" },
      update: {},
      create: { name: "Equipación", slug: "equipacion", order: 6 },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Admin user
  const adminPassword = await hash("admin123456", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@fanzone.es" },
    update: {},
    create: {
      name: "Admin FanZone",
      email: "admin@fanzone.es",
      password: adminPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });

  console.log(`✅ Created admin user: ${admin.email}`);

  // Demo club owner
  const ownerPassword = await hash("demo123456", 12);
  const owner = await prisma.user.upsert({
    where: { email: "deportivo@fanzone.es" },
    update: {},
    create: {
      name: "RC Deportivo La Coruña",
      email: "deportivo@fanzone.es",
      password: ownerPassword,
      role: "CLUB_OWNER",
      emailVerified: new Date(),
    },
  });

  // Demo club
  const futbol = sports.find((s) => s.slug === "futbol")!;
  const club = await prisma.club.upsert({
    where: { slug: "deportivo-coruna" },
    update: {},
    create: {
      name: "Deportivo de La Coruña",
      slug: "deportivo-coruna",
      description: "El Real Club Deportivo de La Coruña es un club de fútbol profesional fundado en 1906.",
      shortDesc: "El club gallego con más historia en la élite del fútbol español",
      city: "A Coruña",
      province: "A Coruña",
      region: "Galicia",
      verified: true,
      featured: true,
      division: "Segunda División",
      league: "LaLiga2",
      sportId: futbol.id,
      status: "ACTIVE",
    },
  });

  await prisma.clubMember.upsert({
    where: { userId_clubId: { userId: owner.id, clubId: club.id } },
    update: {},
    create: { userId: owner.id, clubId: club.id, role: "OWNER" },
  });

  // Demo product
  const camisetasCategory = categories.find((c) => c.slug === "camisetas")!;
  const product = await prisma.product.upsert({
    where: { slug: "camiseta-primera-equipacion-deportivo-2024" },
    update: {},
    create: {
      name: "Camiseta Primera Equipación 2024/25",
      slug: "camiseta-primera-equipacion-deportivo-2024",
      description: "Camiseta oficial de primera equipación del RC Deportivo de La Coruña para la temporada 2024/25.",
      price: 69.99,
      comparePrice: 89.99,
      isOfficial: true,
      isTopSeller: true,
      clubId: club.id,
      categoryId: camisetasCategory.id,
    },
  });

  console.log(`✅ Created demo club: ${club.name}`);
  console.log(`✅ Created demo product: ${product.name}`);
  console.log("🎉 Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
