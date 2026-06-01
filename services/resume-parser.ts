import fs from "fs";
import mammoth from "mammoth";
import pdf from "pdf-parse";

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX =
  /(?:\+\d{1,3}[\s-]?)?(?:\(\d{2,5}\)|\d{2,5})[\s-]?\d{3,4}[\s-]?\d{3,4}/g;
const SKILLS_LIST = [
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
];

function normalizeText(text: string) {
  return text
    .replace(/\r/g, " ")
    .replace(/\n/g, " ")
    .replace(/\t/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function extractSection(text: string, sectionNames: string[]) {
  const lowered = text.toLowerCase();
  for (const name of sectionNames) {
    const index = lowered.indexOf(name);
    if (index !== -1) {
      return text.slice(index + name.length).split(/\n\n|\r\n\r\n|\n\r/)[0];
    }
  }
  return "";
}

function extractSkills(text: string) {
  const normalized = normalizeText(text);
  return SKILLS_LIST.filter((skill) => normalized.includes(skill)).map(
    (skill) => skill.replace(".js", ""),
  );
}

export async function parseResumeFile(filePath: string) {
  const extension = filePath.split(".").pop()?.toLowerCase();
  const raw = fs.readFileSync(filePath);
  let content = "";

  if (extension === "pdf") {
    const data = await pdf(raw);
    content = data.text;
  } else if (extension === "docx") {
    const result = await mammoth.extractRawText({ buffer: raw });
    content = result.value;
  } else {
    content = raw.toString("utf-8");
  }

  const normalized = normalizeText(content);
  const email = (normalized.match(EMAIL_REGEX) || [""])[0];
  const phone = (normalized.match(PHONE_REGEX) || [""])[0];
  const name =
    extractSection(content, ["name", "candidate", "profile"])
      .split("\n")[0]
      .trim() || "Unknown Candidate";
  const skills = Array.from(new Set(extractSkills(content)));
  const educationText = extractSection(content, [
    "education",
    "qualifications",
    "academic",
  ])
    .split(/\n|,|\.|;/)
    .map((item) => item.trim())
    .filter(Boolean);
  const experienceText = extractSection(content, [
    "experience",
    "work experience",
    "professional experience",
  ])
    .split(/\n|;|\.|,/)
    .map((item) => item.trim())
    .filter(Boolean);
  const projectsText = extractSection(content, [
    "projects",
    "personal projects",
    "project experience",
  ])
    .split(/\n|;|\.|,/)
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    name: name || "Unknown Candidate",
    email: email || "unknown@example.com",
    phone: phone || "",
    skills,
    education: educationText,
    experience: experienceText,
    projects: projectsText,
    rawText: content,
  };
}
