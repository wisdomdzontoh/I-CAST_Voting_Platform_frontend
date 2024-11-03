import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

const elections = [
  { name: "Student Council Election", organization: "ABC University", date: "2023-06-15" },
  { name: "Board Member Election", organization: "XYZ Corporation", date: "2023-06-20" },
  { name: "City Mayor Election", organization: "Springfield City", date: "2023-07-01" },
  { name: "Club President Election", organization: "Nature Lovers Club", date: "2023-07-05" },
]

export function UpcomingElections() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Elections</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Election Name</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {elections.map((election) => (
              <TableRow key={election.name}>
                <TableCell>{election.name}</TableCell>
                <TableCell>{election.organization}</TableCell>
                <TableCell>{election.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}