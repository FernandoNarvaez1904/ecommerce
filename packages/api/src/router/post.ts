import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const itemRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ["Hola", "Adios"];
  }),
});
