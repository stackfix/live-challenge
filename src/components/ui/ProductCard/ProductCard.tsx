import { ExternalLink,  } from 'lucide-react'
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import ProductCardRequirements from './ProductCardRequirements'

export default function ProductCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded bg-slate-100 flex items-center justify-center text-xl font-bold">
            P
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">Pipedrive</h3>
              <ExternalLink className="h-4 w-4" />
              <Badge variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-50">
                Difficult to use
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                67%
              </Badge>
              <span className="text-sm text-muted-foreground">Okay fit</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">$2,559</div>
          <div className="text-sm text-muted-foreground">Per month</div>
          <Button variant="link" className="p-0 h-auto mt-1">
            More details
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>REQUIREMENTS MET</span>
              <span>3/6</span>
            </div>
            <Progress value={50} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>STACK/FIX RATING</span>
              <span>7.9</span>
            </div>
            <Progress value={79} className="h-2" />
          </div>
        </div>
        <ProductCardRequirements/>
      </CardContent>
    </Card>
  )
}

