import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "$/src/server/api/trpc";
import {
  userUpdateSchema,
  userGetSchema,
  idSchema,
} from "$/src/server/api/schemas/users";
import { type Response } from "$/src/utils/types";

export const usersRouter = createTRPCRouter({
  //get all users
  get: publicProcedure.input(userGetSchema).query(async ({ input, ctx }) => {
    const response: Response = {
      success: true,
      message: "users obtained",
      data: {},
    };

    const users = await ctx.db.user.findMany();
    return { ...response, ...{ data: users } };
  }),

  //get user by id
  getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    return ctx.db.user.findUnique({
      where: idSchema.parse(input),
    });
  }),

  //update user
  updateUser: protectedProcedure
    .input(userUpdateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.db.user.update({
        where: {
          id: input.id.toString(),
        },
        data: userUpdateSchema.parse(input),
      });
    }),

  //delete user
  deleteUser: protectedProcedure
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      const response: Response = {
        success: true,
        message: "User deleted",
        data: {},
      };

      const result = await ctx.db.user.delete({
        where: idSchema.parse(input),
      });

      if (!result.id) {
        response.success = false;
      }

      return { ...response, ...{ data: result } };
    }),
});
