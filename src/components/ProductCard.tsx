import { ChevronDown, ExternalLink, Info, Split } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { type Product } from "~/server/api/routers/product/types";

interface ProductCardProps {
  product: Product;
  isLoading?: boolean;
}
const FlowChartConnector = () => (
  <div className="flex items-center gap-2">
    <Split className="h-4 w-4 rotate-90 text-gray-200" />
  </div>
);

// Left Section - Logo
const ProductLogo = ({ product }: { product: Product }) => (
  <div className="h-24 w-24 shrink-0 rounded-lg bg-gray-100">
    <Link href={`/product/${product.slug}`}>
      {product.logoUrl ? (
        <img
          src={product.logoUrl}
          alt={`${product.name} logo`}
          className="h-full w-full object-contain p-4"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-400">
          <p className="text-4xl font-bold">{product.name?.[0] ?? "?"}</p>
        </div>
      )}
    </Link>
  </div>
);

// Middle Section - Product Info and Metrics
const ProductInfo = ({
  product,
  isExpanded,
  onExpandClick,
}: {
  product: Product;
  isExpanded: boolean;
  onExpandClick: () => void;
}) => (
  <div className="min-w-0 flex-1 border-r border-gray-200 px-6">
    {/* Top Section */}
    <div className="mb-3 flex items-center gap-2">
      <h2 className="text-base font-semibold">{product.name}</h2>
      <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
      <span className="rounded-md bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
        Difficult to use
      </span>
    </div>

    {/* Divider */}
    <div className="my-3 border-t border-gray-200" />

    {/* Bottom Section - Flow Chart Layout */}
    <div className="flex items-center gap-4">
      {/* Left side - Status */}
      <div className="flex items-center gap-2">
        <button
          onClick={onExpandClick}
          className="flex h-5 w-5 items-center justify-center"
        >
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform",
              isExpanded && "rotate-180",
            )}
          />
        </button>
        <div className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
          {product.productScoring?.fitScore ?? 0}%
        </div>
        <span className="text-xs text-gray-600">Okay fit</span>
      </div>

      {/* Flow chart connector - Fork-shaped */}

      <FlowChartConnector />

      {/* Right side - Progress Bars */}
      <div className="flex-1 space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="min-w-[120px] text-xs text-gray-600">
            REQUIREMENTS MET
          </span>
          <div className="relative flex-1">
            <div className="h-1.5 w-full rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gray-400"
                style={{
                  width: `${
                    product.requirements?.length
                      ? ((product.requirements?.filter(
                          (r) => r.status === "met",
                        )?.length ?? 0) /
                          product.requirements.length) *
                        100
                      : 0
                  }%`,
                }}
              />
            </div>
            {/* Progress bar pattern overlay */}
            <div className="absolute right-0 top-0 h-full w-1/4 bg-[linear-gradient(45deg,rgba(255,255,255,.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.2)_50%,rgba(255,255,255,.2)_75%,transparent_75%,transparent)] bg-[length:8px_8px]" />
          </div>
          <span className="whitespace-nowrap text-xs">
            {product.requirements?.filter((r) => r.status === "met")?.length ??
              0}
            /{product.requirements?.length ?? 0}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="min-w-[120px] text-xs text-gray-600">
            STACKFIX RATING
          </span>
          <div className="flex-1">
            <div className="h-1.5 w-full rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gray-400"
                style={{
                  width: `${((product.productScoring?.stackfixScore ?? 0) / 10) * 100}%`,
                }}
              />
            </div>
          </div>
          <span className="whitespace-nowrap text-xs">
            ★ {product.productScoring?.stackfixScore ?? 0}
          </span>
        </div>
      </div>
    </div>
  </div>
);

// Right Section - Pricing
const PricingInfo = ({ product }: { product: Product }) => (
  <div className="flex w-[155px] flex-col items-end gap-2">
    <div className="w-full text-right">
      <div className="text-2xl font-semibold">
        ${product.pricing?.totalPrice.toLocaleString()}
      </div>
      <div className="flex items-center justify-end gap-1 text-sm text-gray-500">
        Per month
        <Info className="h-4 w-4" />
      </div>
    </div>
    <Link
      href={`/product/${product.slug}`}
      className="w-full rounded-lg bg-white px-4 py-2 text-center text-sm shadow-sm hover:bg-gray-50"
    >
      More details
    </Link>
  </div>
);

const getScoreChipStyle = (score: number) => {
  if (score >= 8.5) return "bg-emerald-100 text-emerald-700";
  if (score >= 7.5) return "bg-amber-100 text-amber-700";
  return "bg-red-100 text-red-700";
};

// Expanded Section
const ExpandedContent = ({ product }: { product: Product }) => {
  const ratings = [
    { label: "Ease of use", score: 9.2 },
    { label: "Functionality", score: 7.1 },
    { label: "Customization", score: 8.5 },
    { label: "Exportability", score: 8.8 },
    { label: "Customer Support", score: 7.2 },
    { label: "Compliance", score: 8.2 },
  ];

  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Requirements Section */}
      <div>
        <h3 className="mb-4 text-sm text-gray-500">REQUIREMENTS MET</h3>
        <ul className="space-y-4">
          {product.requirements?.map((req, index) => (
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
              <span className="text-sm text-gray-700">{req.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Ratings Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm text-gray-500">STACKFIX RATING</h3>
          <Link href="#" className="text-sm text-gray-500 hover:underline">
            How we test products
          </Link>
        </div>
        <ul className="space-y-4">
          {ratings.map(({ label, score }) => (
            <li key={label} className="flex items-center gap-3">
              <div
                className={cn(
                  "min-w-[2.75rem] rounded-full px-2 py-0.5 text-center text-sm font-medium",
                  getScoreChipStyle(score),
                )}
              >
                {score}
              </div>
              <span className="text-sm text-gray-700">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Main Component
export function ProductCard({ product, isLoading }: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Card className="w-full bg-[#FAF7F7]">
      <CardContent className="p-6">
        <div className="flex w-full items-start justify-between gap-6">
          <ProductLogo product={product} />
          <ProductInfo
            product={product}
            isExpanded={isExpanded}
            onExpandClick={() => setIsExpanded(!isExpanded)}
          />
          <PricingInfo product={product} />
        </div>

        {/* Expanded Section */}
        {isExpanded && (
          <div className="mt-6 rounded-lg bg-white p-6">
            <ExpandedContent product={product} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Loading State Component
const LoadingState = () => (
  <Card>
    <CardContent className="animate-pulse p-6">
      <div className="flex gap-6">
        <div className="h-24 w-24 rounded-lg bg-gray-200" />
        <div className="flex-1 space-y-4">
          <div className="h-6 w-1/3 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
          <div className="h-2 w-full rounded bg-gray-200" />
        </div>
      </div>
    </CardContent>
  </Card>
);
