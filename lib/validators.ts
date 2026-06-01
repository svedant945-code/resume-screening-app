import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const jobDescriptionSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(10),
});
