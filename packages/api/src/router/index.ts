import { router } from "../trpc";
import { itemRouter } from "./post";
import { authRouter } from "./auth";

export const appRouter = router({
  item: itemRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
