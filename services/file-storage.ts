import fs from "fs/promises";
import path from "path";

const uploadFolder = path.join(process.cwd(), "public", "uploads");

export async function ensureUploadDirectory() {
  await fs.mkdir(uploadFolder, { recursive: true });
}

export async function saveUploadedFile(filename: string, data: Buffer) {
  await ensureUploadDirectory();
  const targetPath = path.join(uploadFolder, filename);
  await fs.writeFile(targetPath, data);
  return `/uploads/${filename}`;
}
