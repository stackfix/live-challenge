import { Check } from 'lucide-react'
import { Badge } from "~/components/ui/badge"
import type { Product } from '~/server/api/routers/product/types'

export interface ProductCardRequirementsProps {
  requirements: Product['requirements']
}

export default function ProductCardRequirements({ requirements }: ProductCardRequirementsProps) {
  return( <div className="grid grid-cols-2 gap-8 mt-8">
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-muted-foreground">REQUIREMENTS MET</h4>
      <ul className="space-y-3">
        {[
          "Sync with calendars and track meetings",
          "Manage Sales Pipeline",
          "Track email engagement rates",
          "Make and track phone calls directly from my browser",
          "Send automated email sequences",
          "Manage contact or deal information",
        ].map((requirement) => (
            <li key={requirement} className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-3 w-3 text-green-600" />
              </div>
              <span className="text-sm">{requirement}</span>
            </li>
          ))}
      </ul>
    </div>

    <div className="space-y-4">
      <h4 className="text-sm font-medium text-muted-foreground">STACK/FIX RATING</h4>
      <ul className="space-y-3">
        {[
          { label: "Ease of use", score: "4.2", color: "emerald" },
          { label: "Functionality", score: "4.1", color: "red" },
          { label: "Customization", score: "4.1", color: "emerald" },
          { label: "Exportability", score: "3.8", color: "emerald" },
          { label: "Customer Support", score: "7.2", color: "red" },
          { label: "Compliance", score: "8.2", color: "emerald" },
        ].map((rating) => (
            <li key={rating.label} className="flex items-center justify-between">
              <span className="text-sm">{rating.label}</span>
              <Badge
                variant="secondary"
                className={`${
rating.color === "emerald"
? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
: "bg-red-100 text-red-700 hover:bg-red-100"
}`}
              >
                {rating.score}
              </Badge>
            </li>
          ))}
      </ul>
    </div>
  </div> )
 }
