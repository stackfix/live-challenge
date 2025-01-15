import { Badge } from "~/components/ui/badge"
import type { Product } from '~/server/api/routers/product/types'
import ProductCardRequirementListIcon from './ProductCardRequirementListIcon'

export interface ProductCardRequirementsProps {
  requirements: Product['requirements']
  ratings: Product['ratings']
}

export default function ProductCardRequirements({ requirements, ratings }: ProductCardRequirementsProps) {
  return( <div className="grid grid-cols-2 gap-8 mt-8">
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-muted-foreground">REQUIREMENTS MET</h4>
      <ul className="space-y-3">
        {requirements.map(({name, status }) => (
          <li key={name} className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full flex items-center justify-center">
              <ProductCardRequirementListIcon status={status} />
            </div>
            <span className="text-sm">{name}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="space-y-4">
      <h4 className="text-sm font-medium text-muted-foreground">STACK/FIX RATING</h4>
      <ul className="space-y-3">
        {
          ratings.map(({score, name}) => (
            <li key={name} className="flex items-center justify-start">
              <Badge
                variant="secondary"
                className={score > 8
                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                  : "bg-red-100 text-red-700 hover:bg-red-100"
                }
              >
                {score}
              </Badge>
              <span className="text-sm">{name}</span>
            </li>
          ))}
      </ul>
    </div>
  </div> )
}
