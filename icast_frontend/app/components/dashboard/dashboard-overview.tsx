import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Users, Vote, BarChart2, Calendar } from "lucide-react"

const stats = [
  { title: "Total Organizations", value: "120", icon: Users },
  { title: "Active Elections", value: "8", icon: Vote },
  { title: "Total Votes Cast", value: "24,320", icon: BarChart2 },
  { title: "Upcoming Elections", value: "5", icon: Calendar },
]

export function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}