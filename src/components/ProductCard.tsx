import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { type Product } from "~/server/api/routers/product/types";
import { Card, CardContent } from "./ui/card";
interface ProductCardProps {
  product: Product;
  isLoading?: boolean;
}

export function ProductCard({ product, isLoading }: ProductCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {/* Left side */}
            <div className="flex gap-4">
              <div className="h-12 w-12 animate-pulse rounded bg-gray-200" />
              <div className="space-y-2">
                <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
                <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
            {/* Right side */}
            <div className="text-right">
              <div className="h-7 w-24 animate-pulse rounded bg-gray-200" />
              <div className="mt-1 h-4 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          {/* Progress bars */}
          <div className="mt-6 space-y-3">
            <div className="space-y-1">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-2 w-full animate-pulse rounded bg-gray-200" />
            </div>
            <div className="space-y-1">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-2 w-full animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded bg-gray-100">
              <Link href={`/product/${product.slug}`}>
                {product.logoUrl ? (
                  <img
                    src={product.logoUrl}
                    alt={`${product.name} logo`}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <p className="text-2xl font-bold">{product.name[0]}</p>
                  </div>
                )}
              </Link>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Link
                  href={`/product/${product.slug}`}
                  className="text-xl font-semibold hover:underline"
                >
                  {product.name}
                </Link>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-amber-100 px-2 py-0.5 text-sm font-medium text-amber-700">
                  {product.productScoring.fitScore}%
                </span>
                <span className="text-sm text-gray-600">Okay fit</span>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="text-right">
            <div className="text-2xl font-bold">
              ${product.pricing.totalPrice}
            </div>
            <div className="text-sm text-gray-500">
              Per {product.pricing.period}{" "}
              <span className="inline-block">ⓘ</span>
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
        <div className="mt-6 space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">REQUIREMENTS MET</span>
              <span>
                {product.requirements.filter((r) => r.status === "met").length}/
                {product.requirements.length}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gray-400"
                style={{
                  width: `${(product.requirements.filter((r) => r.status === "met").length / product.requirements.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">STACKFIX RATING</span>
              <span>★ {product.productScoring.stackfixScore}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gray-400"
                style={{
                  width: `${(product.productScoring.stackfixScore / 10) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
