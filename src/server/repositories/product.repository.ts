import { Prisma } from "@prisma/client";
import {
  type Product,
  type Requirement,
  type TimePeriod,
} from "../api/routers/product/types";
import { prisma } from "../db";

export class ProductRepository {
  private transformProduct(product: any): Product {
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
        period: product.pricingPeriod as TimePeriod,
      },
      requirements: product.requirements.map((req: Requirement) => ({
        name: req.name,
        status: req.status as "met" | "unmet" | "partially-met",
      })),
    };
  }

  async findAll() {
    const products = await prisma.product.findMany({
      include: { requirements: { select: { name: true, status: true } } },
    });
    return products.map(this.transformProduct);
  }

  async findBySlug(slug: string) {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { requirements: { select: { name: true, status: true } } },
    });
    return product ? this.transformProduct(product) : null;
  }

  async search(query: string) {
    return await prisma.product.findMany({
      where: {
        OR: [{ name: { contains: query, mode: "insensitive" } }],
      },
      take: 5,
    });
  }

  async getPaginated(page: number, limit: number, search?: string) {
    const where: Prisma.ProductWhereInput = search
      ? { OR: [{ name: { contains: search, mode: "insensitive" } }] }
      : {};

    const [totalItems, items] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: "asc" },
        include: { requirements: { select: { name: true, status: true } } },
      }),
    ]);

    return {
      items: items.map(this.transformProduct),
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
    };
  }
}
