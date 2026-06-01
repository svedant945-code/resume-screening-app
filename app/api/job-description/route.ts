import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jobDescriptionSchema } from "@/lib/validators";

export async function GET() {
  const jobDescriptions = await prisma.jobDescription.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ jobDescriptions });
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const parseResult = jobDescriptionSchema.safeParse(payload);

  if (!parseResult.success) {
    return NextResponse.json(
      {
        message: "Invalid job description data",
        errors: parseResult.error.flatten(),
      },
      { status: 400 },
    );
  }

  const jobDescription = await prisma.jobDescription.create({
    data: parseResult.data,
  });
  return NextResponse.json({ jobDescription }, { status: 201 });
}
