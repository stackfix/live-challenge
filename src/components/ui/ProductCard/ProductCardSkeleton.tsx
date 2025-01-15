import { Card } from "~/components/ui/card"
import { Skeleton } from "~/components/ui/skeleton"
import { HelpCircle } from 'lucide-react'

export default function ProductCardSkeleton() {
  return (
    <Card className="flex items-center justify-between p-6">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[400px]" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-1.5">
          <span className="text-2xl font-bold">$</span>
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          Per month
          <HelpCircle className="h-4 w-4" />
        </div>
      </div>
    </Card>
  )
}

