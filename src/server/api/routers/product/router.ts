import { z } from "zod";
import { env } from "../../../../env.mjs";
import { prisma } from "../../../db";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { data } from "./data";
import { Requirement } from "./types";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    if (env.USE_API_DATA === "true") {
      return data;
    }

    const products = await prisma.product.findMany({
      include: {
        requirements: {
          select: {
            name: true,
            status: true,
          },
        },
      },
    });

    // Transform DB data to match API format
    return products.map((product: any) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      logoUrl: product.logoUrl ?? undefined,
      productScoring: {
        stackfixScore: product.stackfixScore,
        fitScore: product.fitScore,
      },
      dealBreakers: product.dealBreakers ?? [],
      pricing: {
        totalPrice: product.totalPrice,
        period: product.period,
      },
      requirements: product.requirements.map((req: Requirement) => ({
        name: req.name,
        status: req.status as "met" | "unmet" | "partially-met",
      })),
    }));
  }),

  getBySlug: publicProcedure.input(z.string()).query(async ({ input }) => {
    if (env.USE_API_DATA === "true") {
      return data.find((product) => product.slug === input);
    }

    const product = await prisma.product.findUnique({
      where: { slug: input },
      include: {
        requirements: {
          select: {
            name: true,
            status: true,
          },
        },
      },
    });

    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      logoUrl: product.logoUrl ?? undefined,
      productScoring: {
        stackfixScore: product.stackfixScore,
        fitScore: product.fitScore,
      },
      dealBreakers: product.dealBreakers ?? [],
      pricing: {
        totalPrice: product.totalPrice,
        period: product.pricingPeriod,
      },
      requirements: product.requirements.map((req) => ({
        name: req.name,
        status: req.status as "met" | "unmet" | "partially-met",
      })),
    };
  }),
});
