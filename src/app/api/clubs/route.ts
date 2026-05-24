import { NextRequest, NextResponse } from "next/server";
import { mockClubs } from "@/data/mock";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sport = searchParams.get("sport");
  const region = searchParams.get("region");
  const featured = searchParams.get("featured");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  let clubs = [...mockClubs];

  if (sport) clubs = clubs.filter((c) => c.sport.id === sport);
  if (region) clubs = clubs.filter((c) => c.region === region);
  if (featured === "true") clubs = clubs.filter((c) => c.featured);

  const total = clubs.length;
  const start = (page - 1) * limit;
  const paginatedClubs = clubs.slice(start, start + limit);

  return NextResponse.json({
    data: paginatedClubs,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}
