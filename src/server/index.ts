import { greetingRouter } from "./routes/greeting";
import { router } from "./trpc";

export const appRouter = router({
  greeting: greetingRouter,
});

export type AppRouter = typeof appRouter;
