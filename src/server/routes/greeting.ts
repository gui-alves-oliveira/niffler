import type { TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure, publicProcedure } from "@/server/trpc";

export const greetingRouter = {
  hello: publicProcedure.query(() => {
    return "Hello World!";
  }),
  user: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user.name;
  }),
} satisfies TRPCRouterRecord;
