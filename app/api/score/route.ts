import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const scores = await prisma.candidateScore.findMany({
    orderBy: { score: "desc" },
    include: { resume: true },
  });

  return NextResponse.json({ scores });
}
