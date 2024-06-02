import { createTRPCRouter, publicProcedure } from "$/src/server/api/trpc";
import {
  userSchema,
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

  //create user
  createUser: publicProcedure.input(userSchema).mutation(({ input, ctx }) => {
    return ctx.db.user.create({
      data: userSchema.parse(input),
    });
  }),

  //update user
  updateUser: publicProcedure
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
  deleteUser: publicProcedure.input(idSchema).mutation(({ input, ctx }) => {
    return ctx.db.user.delete({
      where: idSchema.parse(input),
    });
  }),
});
