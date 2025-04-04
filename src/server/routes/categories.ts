import { protectedProcedure } from "@/server/trpc";
import { category } from "../db/schema";
import { eq } from "drizzle-orm";

export const categoriesRouter = {
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db
      .select()
      .from(category)
      .where(eq(category.userId, ctx.user.id));

    return categories;
  }),

  getById: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user.name;
  }),

  create: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user.name;
  }),

  update: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user.name;
  }),

  delete: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user.name;
  }),
};
