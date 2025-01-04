import { type NextPage } from "next";
import { useState } from "react";
import { ProductSearch } from "~/components/ProductSearch";
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

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Compare Products</h1>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <ProductSearch
            placeholder="Select first product"
            onProductSelect={(product) =>
              setSelectedProducts((prev) => ({ ...prev, first: product.slug }))
            }
          />
          {firstProduct.data && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">
                {firstProduct.data.name}
              </h2>
              {/* Add more product details here */}
            </div>
          )}
        </div>

        <div>
          <ProductSearch
            placeholder="Select second product"
            onProductSelect={(product) =>
              setSelectedProducts((prev) => ({ ...prev, second: product.slug }))
            }
          />
          {secondProduct.data && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">
                {secondProduct.data.name}
              </h2>
              {/* Add more product details here */}
            </div>
          )}
        </div>
      </div>

      {firstProduct.data && secondProduct.data && (
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Comparison</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3>Price: {firstProduct.data.pricing.totalPrice}</h3>
              <h3>Score: {firstProduct.data.productScoring.stackfixScore}</h3>
              <h3>Requirements:</h3>
              <ul>
                {firstProduct.data.requirements.map((req) => (
                  <li key={req.name}>
                    {req.name}: {req.status}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Price: {secondProduct.data.pricing.totalPrice}</h3>
              <h3>Score: {secondProduct.data.productScoring.stackfixScore}</h3>
              <h3>Requirements:</h3>
              <ul>
                {secondProduct.data.requirements.map((req) => (
                  <li key={req.name}>
                    {req.name}: {req.status}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
