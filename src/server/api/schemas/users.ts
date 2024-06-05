import { z } from "zod";

export const idSchema = z.object({ userId: z.string() });

export const userSchema = z.object({
  name: z.string(),
  about: z.string(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export const userGetSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
});

export const userUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});
