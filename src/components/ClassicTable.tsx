import { useState } from "react";
import { cn } from "~/lib/utils";

export interface Column<T> {
  header: string;
  accessor: ((item: T) => string | number) | keyof T;
  sortable?: boolean;
}

interface ClassicTableProps<T> {
  data: T[];
  columns: Column<T>[];
  defaultSortColumn?: string;
  defaultSortDirection?: "asc" | "desc";
  onSearch?: (query: string) => void;
  isLoading?: boolean;
  rowsPerPage?: number;
}

export function ClassicTable<T>({
  data,
  columns,
  defaultSortColumn,
  defaultSortDirection = "asc",
  onSearch,
  isLoading,
  rowsPerPage = 10,
}: ClassicTableProps<T>) {
  const [sortConfig, setSortConfig] = useState({
    key: defaultSortColumn || "",
    direction: defaultSortDirection,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search query
  const filteredData = data.filter((item) => {
    if (!searchQuery) return true;

    return columns.some((column) => {
      const value =
        typeof column.accessor === "function"
          ? column.accessor(item)
          : item[column.accessor];

      return String(value).toLowerCase().includes(searchQuery.toLowerCase());
    });
  });

  // Sort the filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const column = columns.find((col) => col.header === sortConfig.key);
    if (!column) return 0;

    let aValue: string | number;
    let bValue: string | number;

    if (typeof column.accessor === "function") {
      aValue = column.accessor(a);
      bValue = column.accessor(b);
    } else {
      aValue = a[column.accessor] as string | number;
      bValue = b[column.accessor] as string | number;
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const requestSort = (header: string) => {
    const column = columns.find((col) => col.header === header);
    if (!column?.sortable) return;

    setSortConfig((current) => ({
      key: header,
      direction:
        current.key === header && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-md flex-1">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:border-gray-500 focus:outline-none"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + rowsPerPage, sortedData.length)} of{" "}
          {sortedData.length} entries
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex h-32 items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      ) : (
        /* Table */
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.header}
                    className={cn(
                      "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500",
                      column.sortable && "cursor-pointer hover:bg-gray-100",
                    )}
                    onClick={() => requestSort(column.header)}
                  >
                    <div className="flex items-center gap-2">
                      {column.header}
                      {column.sortable && sortConfig.key === column.header && (
                        <span className="text-gray-400">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {paginatedData.map((item, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td
                      key={column.header}
                      className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                    >
                      {typeof column.accessor === "function"
                        ? column.accessor(item)
                        : String(item[column.accessor])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700",
                currentPage === 1
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-50",
              )}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={cn(
                "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700",
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-gray-50",
              )}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={cn(
                    "relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500",
                    currentPage === 1
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-gray-50",
                  )}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={cn(
                      "relative inline-flex items-center border px-4 py-2 text-sm font-medium",
                      currentPage === index + 1
                        ? "z-10 border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50",
                    )}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={cn(
                    "relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500",
                    currentPage === totalPages
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-gray-50",
                  )}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
