import { ProductCard } from "~/components/ProductCard";
import { api } from "~/utils/api";

export default function Home() {
  const { data: products, isLoading } = api.product.getAll.useQuery();

  return (
    <div className="container mx-auto space-y-4 p-4">
      {isLoading
        ? // Show loading states
          Array(3)
            .fill(0)
            .map((_, i) => (
              <ProductCard key={i} product={{} as any} isLoading={true} />
            ))
        : products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  );
}
