import { env } from "$/src/env";
import {
  type WalletAddress,
  type AuthenticatedClient,
  type Grant,
  createAuthenticatedClient,
  type IncomingPaymentWithPaymentMethods,
  type PendingGrant,
} from "@interledger/open-payments";
import {
  type OPAuthSchema,
  type OPCreateSchema,
} from "../api/schemas/openPayments";
import { randomUUID } from "crypto";
import { unknown } from "zod";
import { OutgoingPayment, Qoute } from "$/src/utils/types";

export async function getAuthenticatedClient(): Promise<AuthenticatedClient> {
  let walletAddress = env.OPEN_PAYMENTS_CLIENT_ADDRESS;

  if (walletAddress.startsWith("$")) {
    walletAddress = walletAddress.replace("$", "https://");
  }

  const client = await createAuthenticatedClient({
    walletAddressUrl: env.OPEN_PAYMENTS_CLIENT_ADDRESS,
    privateKey: env.OPEN_PAYMENTS_SECRET_KEY_PATH,
    keyId: env.OPEN_PAYMENTS_KEY_ID,
  });
  return client;
}

export async function getWalletAddressInfo(
  client: AuthenticatedClient,
  walletAddress: string,
): Promise<[string, WalletAddress]> {
  // TODO: Get address info from auth ASE given the url
  return [walletAddress, {} as unknown as WalletAddress];
}

export async function createIncomingPayment(
  client: AuthenticatedClient,
  value: string,
  walletAddressDetails: WalletAddress,
): Promise<IncomingPaymentWithPaymentMethods> {
  // TODO: Create incoming payment resource on the receiver's resource server
  return {} as unknown as IncomingPaymentWithPaymentMethods;
}

export async function createQoute(
  client: AuthenticatedClient,
  incomingPaymentUrl: string,
  walletAddressDetails: WalletAddress,
): Promise<Qoute> {
  // TODO: Create a qoute resource on the sender's resource server
  return {} as unknown as Qoute;
}

export async function getOutgoingPaymentAuthorization(
  client: AuthenticatedClient,
  input: OPAuthSchema,
  walletAddressDetails: WalletAddress,
): Promise<PendingGrant> {
  // TODO: Get a pending grant that must be validated by the user on the UI
  return {} as unknown as PendingGrant;
}

export async function createOutgoingPayment(
  client: AuthenticatedClient,
  input: OPCreateSchema,
): Promise<OutgoingPayment> {
  // TODO: create the outgoing payment by continuing the grant request then creating the outgoing payment
  return {} as unknown as OutgoingPayment;
}
