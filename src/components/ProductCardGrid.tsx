import { type Product } from "~/server/api/routers/product/types";
import { ProductCard } from "./ProductCard";

interface ProductCardGridProps {
  isLoading: boolean;
  data:
    | {
        items: Product[];
        totalItems: number;
      }
    | undefined;
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
}

export function ProductCardGrid({
  isLoading,
  data,
  rowsPerPage,
  currentPage,
  onPageChange,
  onSearch,
}: ProductCardGridProps) {
  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full rounded-md border border-gray-300 px-4 py-2"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Product Cards */}
      <div className="space-y-4">
        {isLoading
          ? Array(rowsPerPage)
              .fill(0)
              .map((_, i) => (
                <ProductCard key={i} product={{} as any} isLoading={true} />
              ))
          : data?.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {/* Pagination */}
      {data && (
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(data.totalItems / rowsPerPage)}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= Math.ceil(data.totalItems / rowsPerPage)}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
