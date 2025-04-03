import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  users: publicProcedure.query(async () => {
    return [];
  }),
});

export type AppRouter = typeof appRouter;
