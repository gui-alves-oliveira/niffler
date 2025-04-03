import { authClient } from "@/lib/auth-client";
import { initTRPC, TRPCError } from "@trpc/server";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = publicProcedure.use(async (opts) => {
  const { data } = await authClient.getSession();

  console.log(data);

  if (!data || data.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      session: data.session,
    },
  });
});
