import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const orderRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        total: z.number().nonnegative(),
        items: z
          .object({
            id: z.number().positive(),
            quantity: z.number().nonnegative(),
          })
          .array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const itemIds = input.items.map((item) => item.id);
      const items = await ctx.prisma.items.findMany({
        where: {
          id: { in: itemIds },
        },
      });

      const q: Record<number, number> = {};
      input.items.forEach((item) => {
        q[item.id] = item.quantity;
      });

      return await ctx.prisma.orders.create({
        data: {
          status: "Placed",
          total: input.total,
          user_id: ctx.auth.userId,
          orderitems: {
            create: items.map((item) => ({
              name: item.name,
              price: item.price,
              quantity: q[item.id] ?? 0,
            })),
          },
        },
        include: {
          orderitems: true,
        },
      });
    }),
});
