import { privateProcedure, router } from "./trpc";

export const appRouter = router({
  users: privateProcedure.query(async () => {
    return [{ hello: "world" }];
  }),
});

export type AppRouter = typeof appRouter;
