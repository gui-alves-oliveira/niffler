import { categoriesRouter } from "./routes/categories";
import { transactionsRouter } from "./routes/transactions";
import { router } from "./trpc";

export const appRouter = router({
  categories: categoriesRouter,
  transactions: transactionsRouter,
});

export type AppRouter = typeof appRouter;
