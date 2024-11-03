import { useState } from 'react'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { PlusCircle, Search } from 'lucide-react'

interface Organization {
  id: string
  name: string
  type: string
  members: number
  status: 'Active' | 'Inactive'
}

const organizations: Organization[] = [
  { id: '1', name: 'Acme Corp', type: 'Corporation', members: 500, status: 'Active' },
  { id: '2', name: 'Springfield University', type: 'Educational', members: 10000, status: 'Active' },
  { id: '3', name: 'Green Valley HOA', type: 'Non-Profit', members: 250, status: 'Inactive' },
  { id: '4', name: 'TechStart Incubator', type: 'Technology', members: 100, status: 'Active' },
]

export function OrganizationList({ onAdd, onEdit, onView }: {
  onAdd: () => void
  onEdit: (org: Organization) => void
  onView: (org: Organization) => void
}) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search organizations"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-[300px]"
          />
        </div>
        <Button onClick={onAdd}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Organization
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrganizations.map((org) => (
            <TableRow key={org.id}>
              <TableCell>{org.name}</TableCell>
              <TableCell>{org.type}</TableCell>
              <TableCell>{org.members}</TableCell>
              <TableCell>{org.status}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => onView(org)}>View</Button>
                <Button variant="ghost" onClick={() => onEdit(org)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}