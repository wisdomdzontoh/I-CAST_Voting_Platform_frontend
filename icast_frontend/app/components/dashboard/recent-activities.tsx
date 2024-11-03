import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const activities = [
  { user: "John Doe", action: "voted in", election: "Student Council Election" },
  { user: "Jane Smith", action: "created", election: "Board Member Election" },
  { user: "Alice Johnson", action: "ended", election: "City Mayor Election" },
  { user: "Bob Wilson", action: "started", election: "Club President Election" },
]

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>
                <strong>{activity.user}</strong> {activity.action}{" "}
                <strong>{activity.election}</strong>
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}