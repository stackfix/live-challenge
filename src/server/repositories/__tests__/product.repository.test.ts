/// <reference types="jest" />

import { prisma } from "../../db";
import { ProductRepository } from "../product.repository";

// Mock the Prisma client
jest.mock("../../db", () => ({
  prisma: {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      count: jest.fn(),
    },
  },
}));

describe("ProductRepository", () => {
  let repository: ProductRepository;
  const mockProduct = {
    id: "1",
    name: "Test Product",
    slug: "test-product",
    logoUrl: "https://example.com/logo.png",
    stackfixScore: 8.5,
    fitScore: 85,
    dealBreakers: [],
    totalPrice: 99.99,
    pricingPeriod: "monthly",
    requirements: [
      { name: "Requirement 1", status: "met" },
      { name: "Requirement 2", status: "unmet" },
    ],
  };

  beforeEach(() => {
    repository = new ProductRepository();
    jest.clearAllMocks();
  });

  describe("findAll", () => {
    it("should return transformed products", async () => {
      (prisma.product.findMany as jest.Mock).mockResolvedValue([mockProduct]);

      const result = await repository.findAll();

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        include: { requirements: { select: { name: true, status: true } } },
      });
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty("productScoring");

      expect(result[0]?.productScoring).toEqual({
        stackfixScore: 8.5,
        fitScore: 85,
      });
    });
  });

  describe("findBySlug", () => {
    it("should return transformed product when found", async () => {
      (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);

      const result = await repository.findBySlug("test-product");

      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { slug: "test-product" },
        include: { requirements: { select: { name: true, status: true } } },
      });
      expect(result).not.toBeNull();
      expect(result?.slug).toBe("test-product");
    });

    it("should return null when product not found", async () => {
      (prisma.product.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findBySlug("non-existent");

      expect(result).toBeNull();
    });
  });

  describe("search", () => {
    it("should return search results", async () => {
      (prisma.product.findMany as jest.Mock).mockResolvedValue([mockProduct]);

      const result = await repository.search("test");

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: {
          OR: [{ name: { contains: "test", mode: "insensitive" } }],
        },
        take: 5,
      });
      expect(result).toHaveLength(1);
    });
  });

  describe("getPaginated", () => {
    it("should return paginated results", async () => {
      (prisma.product.count as jest.Mock).mockResolvedValue(15);
      (prisma.product.findMany as jest.Mock).mockResolvedValue([mockProduct]);

      const result = await repository.getPaginated(2, 10, "test");

      expect(prisma.product.count).toHaveBeenCalledWith({
        where: {
          OR: [{ name: { contains: "test", mode: "insensitive" } }],
        },
      });
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: {
          OR: [{ name: { contains: "test", mode: "insensitive" } }],
        },
        skip: 10,
        take: 10,
        orderBy: { name: "asc" },
        include: { requirements: { select: { name: true, status: true } } },
      });
      expect(result).toEqual({
        items: expect.any(Array),
        totalItems: 15,
        currentPage: 2,
        totalPages: 2,
      });
    });

    it("should handle empty search parameter", async () => {
      (prisma.product.count as jest.Mock).mockResolvedValue(5);
      (prisma.product.findMany as jest.Mock).mockResolvedValue([mockProduct]);

      const result = await repository.getPaginated(1, 10);

      expect(prisma.product.count).toHaveBeenCalledWith({
        where: {},
      });
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: {},
        skip: 0,
        take: 10,
        orderBy: { name: "asc" },
        include: { requirements: { select: { name: true, status: true } } },
      });
      expect(result.totalPages).toBe(1);
    });
  });
});
