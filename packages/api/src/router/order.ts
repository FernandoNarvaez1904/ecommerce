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
      return ctx.prisma.$transaction(async (tx) => {
        const itemIds = input.items.map((item) => item.id);
        const items = await tx.items.findMany({
          where: {
            id: { in: itemIds },
          },
        });

        const q: Record<number, number> = {};
        input.items.forEach((item) => {
          q[item.id] = item.quantity;
        });

        const order = await tx.orders.create({
          data: {
            status: "Placed",
            total: input.total,
            user_id: ctx.auth.userId,
            orderitems: {
              create: items.map((item) => ({
                itemId: item.id,
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

        const updatePromises = order.orderitems.map((orderItem) => {
          const itemId = orderItem.itemId ?? -1;
          const item = items.find((item) => item.id === orderItem.itemId);

          return tx.items.update({
            where: {
              id: itemId,
            },
            data: {
              stock:
                (item?.stock.toNumber() ?? 0) - orderItem.quantity.toNumber(),
            },
          });
        });

        await Promise.all(updatePromises);

        return order;
      });
    }),

  allMyOrders: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.orders.findMany();
  }),
});
