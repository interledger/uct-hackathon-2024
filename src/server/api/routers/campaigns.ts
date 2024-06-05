import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "$/src/server/api/trpc";
import {
  campaignGetSchema,
  idSchema,
} from "$/src/server/api/schemas/campaigns";
import { type Response } from "$/src/utils/types";

export const campaignsRouter = createTRPCRouter({
  //get all campaigns
  get: publicProcedure
    .input(campaignGetSchema)
    .query(async ({ input, ctx }) => {
      const response: Response = {
        success: true,
        message: "campaigns obtained",
        data: {},
      };

      const campaigns = await ctx.db.campaign.findMany({
        where: input,
      });
      return { ...response, ...{ data: campaigns } };
    }),

  //get campaign by id
  getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    return ctx.db.campaign.findUnique({
      where: idSchema.parse(input),
    });
  }),

  //delete campaign
  deleteCampaign: protectedProcedure
    .input(idSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.campaign.delete({
        where: idSchema.parse(input),
      });
    }),
});
