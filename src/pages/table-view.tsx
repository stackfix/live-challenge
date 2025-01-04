import Link from "next/link";
import { useState } from "react";
import { ClassicTable, type Column } from "~/components/ClassicTable";
import { type Product } from "~/server/api/routers/product/types";
import { api } from "~/utils/api";

export default function TableView() {
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
      staleTime: 30000, // Consider data fresh for 30 seconds
    },
  );

  const columns: Column<Product>[] = [
    {
      header: "Name",
      accessor: "name" as keyof Product,
      sortable: true,
    },
    {
      header: "Fit Score",
      accessor: (product: Product) => product.productScoring?.fitScore ?? 0,
      sortable: true,
    },
    {
      header: "Requirements Met",
      accessor: (product: Product) =>
        `${product.requirements?.filter((r) => r.status === "met")?.length ?? 0}/${product.requirements?.length ?? 0}`,
      sortable: true,
    },
    {
      header: "Stackfix Rating",
      accessor: (product: Product) =>
        product.productScoring?.stackfixScore ?? 0,
      sortable: true,
    },
    {
      header: "Price",
      accessor: (product: Product) =>
        `$${product.pricing?.totalPrice.toLocaleString() ?? 0}/month`,
      sortable: true,
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products Table View</h1>
        <div className="flex gap-2">
          <Link
            href="/compare"
            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
          >
            Compare Products
          </Link>
          <Link
            href="/"
            className="rounded-md bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
          >
            Switch to Card View
          </Link>
        </div>
      </div>

      <ClassicTable<Product>
        data={paginatedData?.items ?? []}
        columns={columns}
        defaultSortColumn="Name"
        defaultSortDirection="asc"
        onSearch={handleSearch}
        isLoading={isLoading}
        currentPage={currentPage}
        totalItems={paginatedData?.totalItems ?? 0}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        serverSidePagination={true}
      />
    </div>
  );
}
