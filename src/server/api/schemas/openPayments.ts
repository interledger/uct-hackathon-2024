import { z } from "zod";

const valueSchema = z.object({
  value: z.string(),
  assetCode: z.string(),
  assetScale: z.number(),
});

export const opAuthSchema = z.object({
  walletAddress: z.string(),
  qouteId: z.string(),
  debitAmount: valueSchema.optional(),
  receiveAmount: valueSchema.optional(),
  redirectUrl: z.string(),
});

export const opCreateSchema = z.object({
  walletAddress: z.string(),
  continueAccessToken: z.string(),
  qouteId: z.string(),
  interactRef: z.string(),
  continueUri: z.string(),
});

export type OPAuthSchema = z.infer<typeof opAuthSchema>;
export type OPCreateSchema = z.infer<typeof opCreateSchema>;
