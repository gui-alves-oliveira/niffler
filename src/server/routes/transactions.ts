import { protectedProcedure } from "@/server/trpc";
import { category, transaction, user } from "../db/schema";
import { count, desc, eq } from "drizzle-orm";
import { z } from "zod";

const createSchema = z.object({
  description: z.string(),
  amount: z.number().min(1),
  type: z.enum(["expense", "income"]),
  categoryId: z.string().uuid(),
});

const getAllSchema = z.object({
  page: z.number().min(1),
  pageSize: z.number().min(1),
});

export const transactionsRouter = {
  getAll: protectedProcedure
    .input(getAllSchema)
    .query(async ({ input, ctx }) => {
      const transactions = await ctx.db
        .select({
          id: transaction.id,
          description: transaction.description,
          amount: transaction.amount,
          type: transaction.type,
          date: transaction.date,
          category: {
            id: category.id,
            name: category.name,
          },
          user: {
            id: user.id,
            name: user.name,
          },
        })
        .from(transaction)
        .where(eq(transaction.userId, ctx.user.id))
        .innerJoin(user, eq(user.id, transaction.userId))
        .innerJoin(category, eq(category.id, transaction.categoryId))
        .orderBy(desc(transaction.date))
        .limit(input.pageSize)
        .offset((input.page - 1) * input.pageSize);

      const [total] = await ctx.db
        .select({ count: count() })
        .from(transaction)
        .where(eq(transaction.userId, ctx.user.id));

      return {
        transactions,
        total: total.count,
      };
    }),
  getById: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user.name;
  }),
  create: protectedProcedure
    .input(createSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input);

      return await ctx.db.insert(transaction).values({
        description: input.description,
        amount: input.amount.toString(),
        type: input.type,
        categoryId: input.categoryId,
        userId: ctx.user.id,
        date: new Date(),
      });
    }),
  update: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user.name;
  }),
  delete: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user.name;
  }),
};
