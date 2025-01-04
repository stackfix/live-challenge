import Link from "next/link";
import { useState } from "react";
import { ProductCardGrid } from "~/components/product-card-grid";
import { api } from "~/utils/api";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { data: paginatedData, isLoading } = api.product.getPaginated.useQuery(
    {
      page: currentPage,
      limit: rowsPerPage,
      search: searchQuery.length >= 2 ? searchQuery : undefined,
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto space-y-4 p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-2">
          <Link
            href="/compare"
            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
          >
            Compare Products
          </Link>
          <Link
            href="/table-view"
            className="rounded-md bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
          >
            Switch to Table View
          </Link>
        </div>
      </div>

      <ProductCardGrid
        isLoading={isLoading}
        data={paginatedData}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
      />
    </div>
  );
}
