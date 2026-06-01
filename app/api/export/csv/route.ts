import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const scores = await prisma.candidateScore.findMany({
    include: { resume: true, jobDescription: true },
  });
  const header = [
    "Rank",
    "Name",
    "Email",
    "Score",
    "Job Title",
    "Matched Skills",
    "Missing Skills",
  ];
  const rows = scores.map((score) => [
    score.rank,
    score.resume.name,
    score.resume.email,
    score.score.toFixed(1),
    score.jobDescription.title,
    score.matchedSkills.join("; "),
    score.missingSkills.join("; "),
  ]);
  const csv = [header, ...rows]
    .map((row) =>
      row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=resume-scores.csv",
    },
  });
}
