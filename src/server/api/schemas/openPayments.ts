import { z } from "zod";
import { subscriptionTypes } from "$/src/utils/types";

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
  subscriptionType: z.enum(subscriptionTypes),
  payments: z.number().optional(),
  redirectUrl: z.string(),
});

export const opCreateSchema = z.object({
  walletAddress: z.string(),
  continueAccessToken: z.string(),
  qouteId: z.string(),
  interactRef: z.string(),
  continueUri: z.string(),
});

export const opSubscriptionSchema = z.object({
  senderWalletAddress: z.string(),
  receiverWalletAddress: z.string(),
  quoteId: z.string(),
  manageUrl: z.string(),
  previousToken: z.string(),
});

export type OPAuthSchema = z.infer<typeof opAuthSchema>;
export type OPCreateSchema = z.infer<typeof opCreateSchema>;
export type OPSubscriptionSchema = z.infer<typeof opSubscriptionSchema>;
