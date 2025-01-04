import { ClassicTable, type Column } from "~/components/ClassicTable";
import { type Product } from "~/server/api/routers/product/types";
import { api } from "~/utils/api";

export default function TableView() {
  const { data: products, isLoading } = api.product.getAll.useQuery();

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

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Products Table View</h1>
      <ClassicTable<Product>
        data={products ?? []}
        columns={columns}
        defaultSortColumn="Name"
        defaultSortDirection="asc"
      />
    </div>
  );
}
