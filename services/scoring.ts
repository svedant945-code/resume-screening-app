import { parseKeywords } from "@/lib/utils";

function uniqueArray(items: string[]) {
  return Array.from(
    new Set(items.map((item) => item.toLowerCase().trim())).values(),
  );
}

function overlap(source: string[], target: string[]) {
  const set = new Set(target.map((item) => item.toLowerCase().trim()));
  return source.filter((item) => set.has(item.toLowerCase().trim()));
}

export function calculateCandidateScore(options: {
  resumeSkills: string[];
  resumeExperience: string[];
  resumeEducation: string[];
  jobDescriptionText: string;
  requiredSkills: string[];
}) {
  const resumeSkills = uniqueArray(options.resumeSkills);
  const resumeExperience = uniqueArray(options.resumeExperience);
  const resumeEducation = uniqueArray(options.resumeEducation);
  const jdKeywords = parseKeywords(options.jobDescriptionText);

  const matchedSkills = overlap(resumeSkills, options.requiredSkills);
  const missingSkills = options.requiredSkills.filter(
    (skill) =>
      !matchedSkills
        .map((item) => item.toLowerCase())
        .includes(skill.toLowerCase()),
  );

  const skillsScore = options.requiredSkills.length
    ? Math.min(
        (matchedSkills.length / options.requiredSkills.length) * 100,
        100,
      )
    : 0;

  const experienceScore = resumeExperience.length
    ? Math.min((resumeExperience.length / 5) * 100, 100)
    : 0;
  const educationScore = resumeEducation.length
    ? Math.min((resumeEducation.length / 3) * 100, 100)
    : 0;

  const similarityKeywords = overlap(jdKeywords, [
    ...resumeSkills,
    ...resumeExperience,
    ...resumeEducation,
  ]);
  const similarityScore = jdKeywords.length
    ? Math.min((similarityKeywords.length / jdKeywords.length) * 100, 100)
    : 0;

  const score =
    skillsScore * 0.4 +
    experienceScore * 0.3 +
    educationScore * 0.15 +
    similarityScore * 0.15;

  return {
    score: Number(score.toFixed(1)),
    matchedSkills,
    missingSkills,
    details: {
      skillsScore,
      experienceScore,
      educationScore,
      similarityScore,
    },
  };
}
