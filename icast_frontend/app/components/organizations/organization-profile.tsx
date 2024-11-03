import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Users, Building, Activity } from 'lucide-react'

interface OrganizationProfileProps {
  organization: {
    id: string
    name: string
    type: string
    members: number
    status: 'Active' | 'Inactive'
  }
  onClose: () => void
}

export function OrganizationProfile({ organization, onClose }: OrganizationProfileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{organization.name}</CardTitle>
        <CardDescription>{organization.type} Organization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          <span>{organization.members} Members</span>
        </div>
        <div className="flex items-center">
          <Building className="mr-2 h-4 w-4" />
          <span>{organization.type}</span>
        </div>
        <div className="flex items-center">
          <Activity className="mr-2 h-4 w-4" />
          <span>Status: {organization.status}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onClose}>Close</Button>
      </CardFooter>
    </Card>
  )
}