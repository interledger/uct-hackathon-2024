import { usersRouter } from "$/src/server/api/routers/users";
import { campaignsRouter } from "$/src/server/api/routers/campaigns";
import { openPaymentsRouter } from "$/src/server/api/routers/openPayments";
import { createCallerFactory, createTRPCRouter } from "$/src/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  campaigns: campaignsRouter,
  openPayments: openPaymentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
