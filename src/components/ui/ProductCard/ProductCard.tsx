
import { ExternalLink, Check } from 'lucide-react'
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader } from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"

export default function ProductCard() {
  return (
    <Card className="w-full max-w-4xl">
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

        <div className="grid grid-cols-2 gap-8 mt-8">
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
        </div>
      </CardContent>
    </Card>
  )
}

