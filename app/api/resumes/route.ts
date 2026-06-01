import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { parseResumeFile } from "@/services/resume-parser";
import { saveUploadedFile } from "@/services/file-storage";
import { calculateCandidateScore } from "@/services/scoring";
import { extractRequiredSkills } from "@/services/jd-analyzer";

export const config = {
  api: {
    bodyParser: false,
  },
};

function getFileName(file: File) {
  const sanitized = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${sanitized}`;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const title = formData.get("title")?.toString() || "Untitled Job";
  const description =
    formData.get("description")?.toString() || "No description provided.";
  const files = formData.getAll("resumes") as File[];

  if (!files.length) {
    return NextResponse.json(
      { message: "No resume files uploaded." },
      { status: 400 },
    );
  }

  const requiredSkills = extractRequiredSkills(description);
  const jobDescription = await prisma.jobDescription.create({
    data: { title, description },
  });

  const savedScores = [];

  for (const file of files) {
    const fileName = getFileName(file);
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileUrl = await saveUploadedFile(fileName, buffer);

    const parsed = await parseResumeFile(
      fileUrl.replace("/uploads/", `public/uploads/`),
    );
    const resume = await prisma.resume.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        phone: parsed.phone,
        skills: parsed.skills,
        education: parsed.education,
        experience: parsed.experience,
        projects: parsed.projects,
        fileUrl,
      },
    });

    const scoreResult = calculateCandidateScore({
      resumeSkills: parsed.skills,
      resumeExperience: parsed.experience,
      resumeEducation: parsed.education,
      jobDescriptionText: description,
      requiredSkills,
    });

    const candidateScore = await prisma.candidateScore.create({
      data: {
        resumeId: resume.id,
        jobDescriptionId: jobDescription.id,
        score: scoreResult.score,
        rank: 0,
        matchedSkills: scoreResult.matchedSkills,
        missingSkills: scoreResult.missingSkills,
      },
      include: { resume: true },
    });

    savedScores.push(candidateScore);
  }

  const allScores = await prisma.candidateScore.findMany({
    where: { jobDescriptionId: jobDescription.id },
    orderBy: { score: "desc" },
  });

  for (let index = 0; index < allScores.length; index++) {
    await prisma.candidateScore.update({
      where: { id: allScores[index].id },
      data: { rank: index + 1 },
    });
  }

  return NextResponse.json(
    {
      message: "Resumes parsed and scored",
      jobDescription,
      scores: savedScores,
    },
    { status: 201 },
  );
}
