import { useState } from "react";
import { api } from "~/utils/api";
import { Card, CardContent } from "./ui/card";
import { CommandInput } from "./ui/command-input";

interface ProductSearchProps {
  onProductSelect: (product: any) => void;
  placeholder?: string;
}

export function ProductSearch({
  onProductSelect,
  placeholder,
}: ProductSearchProps) {
  const [search, setSearch] = useState("");

  const searchResults = api.product.search.useQuery(search, {
    enabled: search.length > 0,
  });

  return (
    <div className="relative">
      <CommandInput
        placeholder={placeholder ?? "Search products..."}
        onValueChange={(value) => setSearch(value)}
      />
      {searchResults.data && searchResults.data.length > 0 && (
        <Card className="absolute z-50 mt-1 w-full">
          <CardContent className="p-0">
            {searchResults.data.map((product) => (
              <button
                key={product.id}
                className="w-full px-4 py-2 text-left hover:bg-accent"
                onClick={() => onProductSelect(product)}
              >
                {product.name}
              </button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
