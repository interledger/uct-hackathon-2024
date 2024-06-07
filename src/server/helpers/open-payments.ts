import { env } from "$/src/env";
import {
  type WalletAddress,
  type AuthenticatedClient,
  Grant,
  OpenPaymentsClientError,
  createAuthenticatedClient,
  PendingGrant,
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

  // create incoming payment
  const incomingPayment = await client.incomingPayment.create(
    {
      url: new URL(walletAddressDetails.id).origin,
      accessToken: (grant as Grant).access_token.value,
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

  // create qoute
  const qoute = await client.quote.create(
    {
      url: new URL(walletAddressDetails.id).origin,
      accessToken: (grant as Grant).access_token.value,
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

export async function getOutgoingPaymentAuthorization(
  client: AuthenticatedClient,
  input: OPAuthSchema,
  walletAddressDetails: WalletAddress,
) {
  console.log("** 1 grant auth");
  console.log(walletAddressDetails);

  // Request OP grant
  const grant = (await client.grant.request(
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
  )) as PendingGrant;

  return grant;
}

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
