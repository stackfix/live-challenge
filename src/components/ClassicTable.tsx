import { useState } from "react";
import { cn } from "~/lib/utils";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => string | number);
  sortable?: boolean;
}

interface ClassicTableProps<T> {
  data: T[];
  columns: Column<T>[];
  defaultSortColumn?: string;
  defaultSortDirection?: "asc" | "desc";
}

export function ClassicTable<T>({
  data,
  columns,
  defaultSortColumn,
  defaultSortDirection = "asc",
}: ClassicTableProps<T>) {
  const [sortConfig, setSortConfig] = useState({
    key: defaultSortColumn || "",
    direction: defaultSortDirection,
  });

  const sortedData = [...data].sort((a, b) => {
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

  const requestSort = (header: string) => {
    const column = columns.find((col) => col.header === header);
    if (!column?.sortable) return;

    setSortConfig((current) => ({
      key: header,
      direction:
        current.key === header && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="overflow-x-auto">
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
          {sortedData.map((item, index) => (
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
  );
}
