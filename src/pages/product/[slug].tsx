import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;

  const { data: product, isLoading } = api.product.getBySlug.useQuery(
    slug as string,
    { enabled: !!slug },
  );

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-semibold">{product.name}</h1>
      <div>Product details page (WIP)</div>
    </div>
  );
}
