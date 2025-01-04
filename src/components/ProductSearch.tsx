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
  const [isOpen, setIsOpen] = useState(false);

  const searchResults = api.product.search.useQuery(search, {
    enabled: search.length > 0,
  });

  const handleSelect = (product: any) => {
    onProductSelect(product);
    setSearch("");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <CommandInput
        placeholder={placeholder ?? "Search products..."}
        value={search}
        onValueChange={(value) => {
          setSearch(value);
          setIsOpen(true);
        }}
      />
      {isOpen && searchResults.data && searchResults.data.length > 0 && (
        <Card className="absolute z-50 mt-1 w-full">
          <CardContent className="p-0">
            {searchResults.data.map((product) => (
              <button
                key={product.id}
                className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-accent"
                onClick={() => handleSelect(product)}
              >
                {product.logoUrl && (
                  <img
                    src={product.logoUrl}
                    alt={product.name}
                    className="h-6 w-6 rounded-md object-contain"
                  />
                )}
                <span>{product.name}</span>
              </button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
