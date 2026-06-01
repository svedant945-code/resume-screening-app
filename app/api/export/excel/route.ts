import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { utils, write } from "xlsx";

export async function GET() {
  const scores = await prisma.candidateScore.findMany({
    include: { resume: true, jobDescription: true },
  });
  const data = [
    [
      "Rank",
      "Name",
      "Email",
      "Score",
      "Job Title",
      "Matched Skills",
      "Missing Skills",
    ],
    ...scores.map((score) => [
      score.rank,
      score.resume.name,
      score.resume.email,
      score.score.toFixed(1),
      score.jobDescription.title,
      score.matchedSkills.join(", "),
      score.missingSkills.join(", "),
    ]),
  ];

  const worksheet = utils.aoa_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Candidates");
  const buffer = write(workbook, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=resume-scores.xlsx",
    },
  });
}
