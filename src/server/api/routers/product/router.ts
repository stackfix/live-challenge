import { Prisma } from "@prisma/client";
import { z } from "zod";
import { env } from "../../../../env.mjs";
import { prisma } from "../../../db";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { data } from "./data";
import { Requirement, type TimePeriod } from "./types";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    // kept for the purpose of testing this assignment both with api and with with db data
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

  search: publicProcedure.input(z.string()).query(async ({ input }) => {
    const products = await prisma.product.findMany({
      where: {
        OR: [{ name: { contains: input, mode: "insensitive" } }],
      },
      take: 5,
    });
    return products;
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
      const { page, limit, search } = input;
      const skip = (page - 1) * limit;

      // Build the where clause with proper Prisma types
      const where: Prisma.ProductWhereInput = search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                } as Prisma.StringFilter,
              },
              // Add other searchable fields here if needed
            ],
          }
        : {};

      // Get total count for pagination
      const totalItems = await prisma.product.count({
        where,
      });

      // Get paginated data
      const items = await prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          name: "asc",
        },
        include: {
          requirements: {
            select: {
              name: true,
              status: true,
            },
          },
        },
      });

      // Transform the data to match the expected format
      const transformedItems = items.map((product) => ({
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
          period: product.pricingPeriod as TimePeriod,
        },
        requirements: product.requirements.map((req) => ({
          name: req.name,
          status: req.status as "met" | "unmet" | "partially-met",
        })),
      }));

      return {
        items: transformedItems,
        totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
      };
    }),
});
