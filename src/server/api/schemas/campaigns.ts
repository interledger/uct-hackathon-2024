import { z } from "zod";

export const idSchema = z.object({ id: z.string() });

export const campaignSchema = z.object({
  title: z.string(),
  about: z.string(),
  amount: z.number(),
  userId: z.string(),
});

export const campaignGetSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
});

export const campaignUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});
