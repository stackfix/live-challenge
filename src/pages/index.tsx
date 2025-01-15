import Head from "next/head";
import ProductCard from "~/components/ui/ProductCard/ProductCard";
import ProductCardSkeleton from "~/components/ui/ProductCard/ProductCardSkeleton";
import type { Product } from "~/server/api/routers/product/types";
import { api } from "~/utils/api";

export function ProductCards({ products }: {products: Product[]}) {
  return (
    <div className="grid">
      {
        products.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))
      }
    </div>
  )

}

export default function Home() {
  const { data: products } = api.product.getAll.useQuery()

  return (
    <>
      <Head>
        <title>Stackfix</title>
        <meta name="description" content="stackfix.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-5">
        <h1 className="text-xl">Stackfix Live Challenge</h1>
        {/* TODO: Your code here */}
        <div className="w-full max-w-4xl">
          {
            products == null 
              ? <ProductCardSkeleton/>
              : <ProductCards products={products}/>
          }
        </div>
      </main>
    </>
  );
}
