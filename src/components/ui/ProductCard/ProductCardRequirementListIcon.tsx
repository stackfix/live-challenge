import { CircleCheck , TriangleAlert, CircleAlert} from 'lucide-react'
import type { Product } from '~/server/api/routers/product/types'

export interface ProductCardRequirementListIconProps {
  status: Product['requirements'][0]['status']
 }
export default function ProductCardRequirementListIcon({ status }: ProductCardRequirementListIconProps) {
  switch(status) {
    case 'met':
      return <CircleCheck className="h-5 w-5 text-green-600"/>
    case 'unmet':
      return <CircleAlert className="h-5 w-5 text-red-600"/>
    case 'partially-met':
      return <TriangleAlert className="h-5 w-5 text-yellow-600"/>
    default:
      status satisfies never; // exhaustiveness check
  }
}
