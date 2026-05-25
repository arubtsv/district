import { NextRequest, NextResponse } from "next/server";
import { mockProducts } from "@/data/mock";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const club = searchParams.get("club");
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const limited = searchParams.get("limited");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const sortBy = searchParams.get("sortBy") ?? "newest";

  let products = [...mockProducts];

  if (club) products = products.filter((p) => p.club.slug === club);
  if (category) products = products.filter((p) => p.category?.slug === category);
  if (featured === "true") products = products.filter((p) => p.isTopSeller);
  if (limited === "true") products = products.filter((p) => p.isLimited);

  // Sort
  if (sortBy === "price_asc") products.sort((a, b) => a.price - b.price);
  if (sortBy === "price_desc") products.sort((a, b) => b.price - a.price);
  if (sortBy === "rating") products.sort((a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0));

  const total = products.length;
  const start = (page - 1) * limit;
  const paginated = products.slice(start, start + limit);

  return NextResponse.json({
    data: paginated,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}
