import { z } from "node_modules/zod/lib";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { data } from "./data";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return data;
  }),

  getBySlug: publicProcedure.input(z.string()).query(({ input }) => {
    return data.find((product) => product.slug === input);
  }),
});
