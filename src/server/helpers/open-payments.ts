import { env } from "$/src/env";
import {
  type WalletAddress,
  type AuthenticatedClient,
  Grant,
  OpenPaymentsClientError,
  createAuthenticatedClient,
  PendingGrant,
  isPendingGrant,
} from "@interledger/open-payments";
import { OPAuthSchema, OPCreateSchema } from "../api/schemas/openPayments";
import { randomUUID } from "crypto";

export async function getAuthenticatedClient() {
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
  if (walletAddress.startsWith("$"))
    walletAddress = walletAddress.replace("$", "https://");

  const walletAddressDetails = await client.walletAddress.get({
    url: walletAddress,
  });

  return [walletAddress, walletAddressDetails];
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
) {
  console.log("** 2 req");
  console.log(walletAddressDetails);

  // Request IP grant
  const grant = await client.grant.request(
    {
      url: walletAddressDetails.authServer,
    },
    {
      access_token: {
        access: [
          {
            type: "incoming-payment",
            actions: ["read", "create", "complete"],
          },
        ],
      },
    },
  );

  if (isPendingGrant(grant)) {
    throw new Error("Expected non-interactive grant");
  }

  // create incoming payment
  const incomingPayment = await client.incomingPayment.create(
    {
      url: new URL(walletAddressDetails.id).origin,
      accessToken: grant.access_token.value,
    },
    {
      walletAddress: walletAddressDetails.id,
      incomingAmount: {
        value: value,
        assetCode: walletAddressDetails.assetCode,
        assetScale: walletAddressDetails.assetScale,
      },
      expiresAt: new Date(Date.now() + 60_000 * 10).toISOString(),
    },
  );

  console.log("** inc");
  console.log(incomingPayment);
  return incomingPayment;
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
) {
  console.log("** 2 req");
  console.log(walletAddressDetails);

  // Request Qoute grant
  const grant = await client.grant.request(
    {
      url: walletAddressDetails.authServer,
    },
    {
      access_token: {
        access: [
          {
            type: "quote",
            actions: ["create", "read", "read-all"],
          },
        ],
      },
    },
  );

  if (isPendingGrant(grant)) {
    throw new Error("Expected non-interactive grant");
  }

  // create qoute
  const qoute = await client.quote.create(
    {
      url: new URL(walletAddressDetails.id).origin,
      accessToken: grant.access_token.value,
    },
    {
      method: "ilp",
      walletAddress: walletAddressDetails.id,
      receiver: incomingPaymentUrl,
    },
  );

  console.log("** qoute");
  console.log(qoute);
  return qoute;
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
  console.log("** 1 grant auth");
  console.log(walletAddressDetails);

  // Request OP grant
  const grant = await client.grant.request(
    {
      url: walletAddressDetails.authServer,
    },
    {
      access_token: {
        access: [
          {
            identifier: walletAddressDetails.id,
            type: "outgoing-payment",
            actions: ["list", "list-all", "read", "read-all", "create"],
            limits: {
              debitAmount: input.debitAmount,
              receiveAmount: input.receiveAmount,
            },
          },
        ],
      },
      interact: {
        start: ["redirect"],
        finish: {
          method: "redirect",
          uri: input.redirectUrl,
          nonce: randomUUID(),
        },
      },
    },
  );

  if (!isPendingGrant(grant)) {
    throw new Error("Expected interactive grant");
  }

  return grant;
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
) {
  let walletAddress = input.walletAddress;
  if (walletAddress.startsWith("$"))
    walletAddress = walletAddress.replace("$", "https://");

  console.log("** outgoing");
  console.log(input);
  // Get the grant since it was still pending
  const grant = (await client.grant.continue(
    {
      accessToken: input.continueAccessToken,
      url: input.continueUri,
    },
    {
      interact_ref: input.interactRef,
    },
  )) as Grant;

  const outgoingPayment = await client.outgoingPayment.create(
    {
      url: new URL(walletAddress).origin,
      accessToken: grant.access_token.value, //OUTGOING_PAYMENT_ACCESS_TOKEN,
    },
    {
      walletAddress: walletAddress,
      quoteId: input.qouteId, //QUOTE_URL,
    },
  );

  return outgoingPayment;
}
