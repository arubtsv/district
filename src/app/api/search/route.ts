import { NextRequest, NextResponse } from "next/server";
import { mockClubs, mockProducts } from "@/data/mock";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.toLowerCase() ?? "";

  if (!q || q.length < 2) {
    return NextResponse.json({ clubs: [], products: [], query: q, total: 0 });
  }

  const clubs = mockClubs
    .filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.city?.toLowerCase().includes(q) ?? false) ||
        c.sport.name.toLowerCase().includes(q) ||
        (c.region?.toLowerCase().includes(q) ?? false)
    )
    .slice(0, 5);

  const products = mockProducts
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.club.name.toLowerCase().includes(q) ||
        (p.category?.name.toLowerCase().includes(q) ?? false)
    )
    .slice(0, 5);

  return NextResponse.json({
    clubs,
    products,
    query: q,
    total: clubs.length + products.length,
  });
}
