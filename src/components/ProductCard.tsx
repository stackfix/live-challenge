import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { type Product } from "~/server/api/routers/product/types";

interface ProductCardProps {
  product: Product;
  isLoading?: boolean;
}

export function ProductCard({ product, isLoading }: ProductCardProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="h-12 w-1/3 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {/* Logo and Title section */}
          <div className="h-12 w-12 rounded bg-gray-100">
            <Link href={`/product/${product.slug}`}>
              {product.logoUrl ? (
                <img
                  src={product.logoUrl}
                  alt={`${product.name} logo`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                  No logo
                </div>
              )}
            </Link>
          </div>

          <div>
            <Link
              href={`/product/${product.slug}`}
              className="flex items-center gap-2 text-xl font-semibold hover:underline"
            >
              {product.name}
              <ExternalLink className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="rounded bg-amber-100 px-2 py-1 text-sm text-amber-700">
                {product.productScoring.fitScore}%
              </span>
              <span className="text-gray-600">Okay fit</span>
            </div>
          </div>
        </div>

        {/* Price section */}
        <div className="text-right">
          <div className="text-2xl font-bold">
            ${product.pricing.totalPrice}
          </div>
          <div className="text-sm text-gray-500">
            Per {product.pricing.period}
          </div>
          <Link
            href={`/product/${product.slug}`}
            className="text-sm text-blue-600 hover:underline"
          >
            More details
          </Link>
        </div>
      </div>

      {/* Requirements and Rating section */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">REQUIREMENTS MET</span>
          <span>
            {product.requirements.filter((r) => r.status === "met").length}/
            {product.requirements.length}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">STACKFIX RATING</span>
          <span>★ {product.productScoring.stackfixScore}</span>
        </div>
      </div>
    </div>
  );
}
