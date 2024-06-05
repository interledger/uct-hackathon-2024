import { z } from "zod";

export const idSchema = z.object({ id: z.string() });

export const campaignSchema = z.object({
  title: z.string(),
  about: z.string(),
  amount: z.number(),
  walletAddress: z.string(),
  userId: z.string(),
});

export const campaignGetSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
});

export const campaignUpdateSchema = z.object({
  id: z.string(),
  title: z.string(),
  about: z.string(),
  walletAddress: z.string(),
  amount: z.number(),
});
