import { type NextPage } from "next";
import { useState } from "react";
import { ProductSearch } from "~/components/ProductSearch";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/utils/api";

const ComparePage: NextPage = () => {
  const [selectedProducts, setSelectedProducts] = useState<{
    first?: string;
    second?: string;
  }>({});

  const firstProduct = api.product.getBySlug.useQuery(
    selectedProducts.first ?? "",
    {
      enabled: !!selectedProducts.first,
    },
  );

  const secondProduct = api.product.getBySlug.useQuery(
    selectedProducts.second ?? "",
    {
      enabled: !!selectedProducts.second,
    },
  );

  const renderProductDetails = (product: any) => (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-4">
        {product.logoUrl && (
          <img
            src={product.logoUrl}
            alt={product.name}
            className="h-12 w-12 rounded-lg object-contain"
          />
        )}
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted p-4">
          <div className="mb-2 font-semibold">Pricing</div>
          <div className="text-2xl font-bold">
            ${product.pricing.totalPrice}
            <span className="text-sm text-muted-foreground">
              /{product.pricing.period}
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-muted p-4">
          <div className="mb-2 font-semibold">Scoring</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">
                Stackfix Score
              </div>
              <div className="text-xl font-semibold">
                {product.productScoring.stackfixScore}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Fit Score</div>
              <div className="text-xl font-semibold">
                {product.productScoring.fitScore}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-muted p-4">
          <div className="mb-2 font-semibold">Requirements</div>
          <div className="space-y-2">
            {product.requirements.map((req: any) => (
              <div
                key={req.name}
                className="flex items-center justify-between rounded-md bg-background p-2"
              >
                <span>{req.name}</span>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    req.status === "met"
                      ? "bg-green-100 text-green-700"
                      : req.status === "partially-met"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Compare Products</h1>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <ProductSearch
            placeholder="Select first product"
            onProductSelect={(product) =>
              setSelectedProducts((prev) => ({ ...prev, first: product.slug }))
            }
          />
          {firstProduct.data && renderProductDetails(firstProduct.data)}
        </div>

        <div className="space-y-4">
          <ProductSearch
            placeholder="Select second product"
            onProductSelect={(product) =>
              setSelectedProducts((prev) => ({ ...prev, second: product.slug }))
            }
          />
          {secondProduct.data && renderProductDetails(secondProduct.data)}
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
