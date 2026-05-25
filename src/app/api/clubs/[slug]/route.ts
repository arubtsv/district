import { NextRequest, NextResponse } from "next/server";
import { mockClubs } from "@/data/mock";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const club = mockClubs.find((c) => c.slug === slug);

  if (!club) {
    return NextResponse.json({ error: "Club no encontrado" }, { status: 404 });
  }

  return NextResponse.json(club);
}
