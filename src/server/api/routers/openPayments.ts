import { createTRPCRouter, publicProcedure } from "$/src/server/api/trpc";
import { type Response } from "$/src/utils/types";
import { z } from "zod";
import {
  createIncomingPayment,
  createOutgoingPayment,
  createQoute,
  getAuthenticatedClient,
  getOutgoingPaymentAuthorization,
  getWalletAddressInfo,
} from "../../helpers/open-payments";
import { opAuthSchema, opCreateSchema } from "../schemas/openPayments";

export const openPaymentsRouter = createTRPCRouter({
  getWalletDetails: publicProcedure
    .input(
      z.object({
        walletAddress: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const response: Response = {
        success: true,
        message: "wallet details obtained",
        data: {},
      };

      // Initialize Open Payments client
      const client = await getAuthenticatedClient();

      const [walletAddress, walletAddressDetails] = await getWalletAddressInfo(
        client,
        input.walletAddress,
      );

      return { ...response, ...{ data: walletAddressDetails } };
    }),

  createIncomingPayment: publicProcedure
    .input(
      z.object({
        walletAddress: z.string(),
        receiverAddress: z.string(),
        value: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const response: Response = {
        success: true,
        message: "incoming payment created",
        data: {},
      };

      // Initialize Open Payments client
      const client = await getAuthenticatedClient();

      // get wallet details
      const [walletAddress, walletAddressDetails] = await getWalletAddressInfo(
        client,
        input.receiverAddress,
      );

      console.log("** 1 inc");

      // create incoming payment
      const incomingPayment = await createIncomingPayment(
        client,
        input.value,
        walletAddressDetails,
      );

      return { ...response, ...{ data: incomingPayment } };
    }),

  createQoute: publicProcedure
    .input(
      z.object({
        walletAddress: z.string(),
        incomingPaymentUrl: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const response: Response = {
        success: true,
        message: "qoute created",
        data: {},
      };

      // Initialize Open Payments client
      const client = await getAuthenticatedClient();

      // get wallet details
      const [walletAddress, walletAddressDetails] = await getWalletAddressInfo(
        client,
        input.walletAddress,
      );

      console.log("** 1 inc");

      // create qoute
      const qoute = await createQoute(
        client,
        input.incomingPaymentUrl,
        walletAddressDetails,
      );

      return { ...response, ...{ data: qoute } };
    }),

  getOutgoingPaymentAuthorization: publicProcedure
    .input(opAuthSchema)
    .query(async ({ input }) => {
      const response: Response = {
        success: true,
        message: "wallet details obtained",
        data: {},
      };

      // Initialize Open Payments client
      const client = await getAuthenticatedClient();

      // get wallet details
      const [walletAddress, walletAddressDetails] = await getWalletAddressInfo(
        client,
        input.walletAddress,
      );

      // create outgoing authorization grant
      const outgoingPaymentAuthorization =
        await getOutgoingPaymentAuthorization(
          client,
          input,
          walletAddressDetails,
        );

      return { ...response, ...{ data: outgoingPaymentAuthorization } };
    }),

  createOutgoingPayment: publicProcedure
    .input(opCreateSchema)
    .query(async ({ input }) => {
      const response: Response = {
        success: true,
        message: "outgoing payment created",
        data: {},
      };

      console.log("** ou");
      console.log(input);
      // Initialize Open Payments client
      const client = await getAuthenticatedClient();

      // create outgoing authorization grant
      const outgoingPaymentResponse = await createOutgoingPayment(
        client,
        input,
      );

      return { ...response, ...{ data: outgoingPaymentResponse } };
    }),
});
