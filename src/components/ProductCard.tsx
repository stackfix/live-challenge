import { ChevronDown, ExternalLink, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { type Product } from "~/server/api/routers/product/types";

interface ProductCardProps {
  product: Product;
  isLoading?: boolean;
}

export function ProductCard({ product, isLoading }: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
          <div className="flex items-center gap-4">
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

            <div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/product/${product.slug}`}
                  className="text-xl font-semibold hover:underline"
                >
                  {product.name}
                </Link>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
              <div className="mt-1 flex items-center gap-4">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1"
                >
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isExpanded && "rotate-180",
                    )}
                  />
                </button>
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-gray-400" />
                  <span className="rounded-md bg-amber-100 px-2 py-0.5 text-sm font-medium text-amber-700">
                    {product.productScoring.fitScore}%
                  </span>
                  <span className="text-sm text-gray-600">Okay fit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="mx-4 h-12 w-px bg-gray-200" />

          {/* Right side */}
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

        {/* Horizontal Divider */}
        <div className="my-6 h-px w-full bg-gray-200" />

        {/* Requirements and Rating section */}
        <div className="space-y-3">
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

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="mb-4 text-sm text-gray-500">REQUIREMENTS MET</h3>
                <ul className="space-y-2">
                  {product.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="rounded-full bg-green-100 p-1">
                        <svg
                          className="h-4 w-4 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{req.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-500">STACKFIX RATING</h3>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:underline"
                  >
                    How we test products
                  </Link>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    ["Stackfix Score", product.productScoring.stackfixScore],
                    ["Fit Score", product.productScoring.fitScore],
                  ].map(([category, score]) => (
                    <div
                      key={category}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{category}</span>
                      <span
                        className={cn(
                          "rounded px-2 py-1 text-sm",
                          typeof score === "number" && score >= 8
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700",
                        )}
                      >
                        {score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
