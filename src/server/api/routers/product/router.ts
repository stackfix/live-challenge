import { z } from "zod";
import { env } from "../../../../env.mjs";
import { ProductRepository } from "../../../repositories/product.repository";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { data } from "./data";

const productRepository = new ProductRepository();

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    if (env.USE_API_DATA === "true") return data;
    return await productRepository.findAll();
  }),

  getBySlug: publicProcedure.input(z.string()).query(async ({ input }) => {
    if (env.USE_API_DATA === "true") {
      return data.find((product) => product.slug === input);
    }
    return await productRepository.findBySlug(input);
  }),

  search: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await productRepository.search(input);
  }),

  getPaginated: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).default(10),
        search: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      return await productRepository.getPaginated(
        input.page,
        input.limit,
        input.search,
      );
    }),
});
