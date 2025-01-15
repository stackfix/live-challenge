import Head from "next/head";
import { useMemo, useState } from "react";
import { Input } from "~/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group"
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

  const [searchParam, setSearchParam] = useState('')
  const [sortParam, setSortParam] = useState<'totalPrice' | 'fitScore' | 'stackFixScore' | undefined>(undefined)

  const filteredProducts = useMemo(() => {
    if (!products) return null
    return products
      .filter(product => product?.name?.toLowerCase().includes(searchParam.toLowerCase()))
      .sort((a, b) => {
      switch (sortParam) {
      case undefined:
        return 0;
        case 'totalPrice':
          return a.pricing.totalPrice - b.pricing.totalPrice;
        case 'fitScore':
          return a.productScoring.fitScore - b.productScoring.fitScore;
        case 'stackFixScore':
          return a.productScoring.stackfixScore - b.productScoring.stackfixScore;
        default:
          sortParam satisfies never;
          return 0;
      }
    })
}, [products, searchParam, sortParam])

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
        <Input placeholder="Search for products" value={searchParam} onChange={(e) => setSearchParam(e.target.value)}/>
        {/* TODO fix type */}
        <ToggleGroup type="single" onValueChange={(value) => setSortParam(value)}>
          <ToggleGroupItem value="totalPrice">Total Price</ToggleGroupItem>
          <ToggleGroupItem value="fitScore">Fit Score</ToggleGroupItem>
          <ToggleGroupItem value="stackFixScore">StackFix Score</ToggleGroupItem>
        </ToggleGroup>

        <div className="w-full max-w-4xl">
          {
            filteredProducts == null 
              ? <ProductCardSkeleton/>
              : <ProductCards products={filteredProducts}/>
          }
        </div>
      </main>
    </>
  );
}
