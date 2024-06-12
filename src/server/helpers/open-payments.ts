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
  // TODO: Instantiate open payments client that connects to the ASE
  return {} as unknown as AuthenticatedClient;
}

export async function getWalletAddressInfo(
  client: AuthenticatedClient,
  walletAddress: string,
): Promise<[string, WalletAddress]> {
  // TODO: Get address info from auth ASE given the url
  return [walletAddress, {} as unknown as WalletAddress];
}

/**
 * The method requests a grant from the receivers auth server for creating an incoming payment grant
 * After receiving the grant the incoming payment resource is created
 *
 * @param client
 * @param value - payment amount to be made
 * @param walletAddressDetails - wallet address details for the receiver
 * @returns
 */
export async function createIncomingPayment(
  client: AuthenticatedClient,
  value: string,
  walletAddressDetails: WalletAddress,
): Promise<IncomingPaymentWithPaymentMethods> {
  // TODO: Create incoming payment resource on the receiver's resource server
  return {} as unknown as IncomingPaymentWithPaymentMethods;
}

/**
 * The method requests a grant to create a qoute on the senders resource server
 * The qoute is then created on the senders resource server
 *
 * @param client
 * @param incomingPaymentUrl - identifier for the incoming payment the qoute is being created for
 * @param walletAddressDetails - wallet address details for the sender
 * @returns
 */
export async function createQoute(
  client: AuthenticatedClient,
  incomingPaymentUrl: string,
  walletAddressDetails: WalletAddress,
): Promise<Qoute> {
  // TODO: Create a qoute resource on the sender's resource server
  return {} as unknown as Qoute;
}

/**
 * This method creates a pending grant which must be authorized by the user
 * After it is authorized the continuation access token we receive can be used to get the actual OP creation grant
 * Tells the client to go ask sender for approval and details of where to come back to continue the process
 *
 * @param client
 * @param input - details from the qoute
 * @param walletAddressDetails - wallet address details for the sender
 * @returns
 */
export async function getOutgoingPaymentAuthorization(
  client: AuthenticatedClient,
  input: OPAuthSchema,
  walletAddressDetails: WalletAddress,
): Promise<PendingGrant> {
  // TODO: Get a pending grant that must be validated by the user on the UI
  return {} as unknown as PendingGrant;
}

/**
 * This method will now get the grant if the user has given permission
 * The grant is then used to create the outgoing payment
 *
 * @param client
 * @param input
 * @returns
 */
export async function createOutgoingPayment(
  client: AuthenticatedClient,
  input: OPCreateSchema,
): Promise<OutgoingPayment> {
  // TODO: create the outgoing payment by continuing the grant request then creating the outgoing payment
  return {} as unknown as OutgoingPayment;
}
