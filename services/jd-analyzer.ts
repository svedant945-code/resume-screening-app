import { parseKeywords } from "@/lib/utils";

export function extractRequiredSkills(description: string) {
  const keywords = parseKeywords(description);
  const skillCandidates = [
    "react",
    "next.js",
    "nextjs",
    "node",
    "typescript",
    "javascript",
    "python",
    "django",
    "flask",
    "postgresql",
    "sql",
    "graphql",
    "rest",
    "prisma",
    "tailwind",
    "css",
    "html",
    "aws",
    "docker",
    "git",
    "azure",
    "kubernetes",
    "figma",
    "communication",
    "leadership",
    "teamwork",
  ];

  return Array.from(
    new Set(skillCandidates.filter((skill) => keywords.includes(skill))),
  );
}
