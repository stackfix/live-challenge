import Link from "next/link";
import { ProductCard } from "~/components/ProductCard";
import { api } from "~/utils/api";

export default function Home() {
  const { data: products, isLoading } = api.product.getAll.useQuery();

  return (
    <div className="container mx-auto space-y-4 p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/table-view"
          className="rounded-md bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
        >
          Switch to Table View
        </Link>
      </div>

      {isLoading
        ? Array(3)
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
