import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export function OrganizationView({ organization }) {
  if (!organization) {
    return <div>No organization data available.</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={organization.logo} alt={organization.name} />
            <AvatarFallback>{organization.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {organization.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Organization Type</dt>
            <dd className="mt-1 text-sm text-gray-900">{organization.organization_type}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900">{organization.email}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900">{organization.address}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
            <dd className="mt-1 text-sm text-gray-900">{organization.phone_number || 'N/A'}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Website</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {organization.website ? (
                <a href={organization.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {organization.website}
                </a>
              ) : 'N/A'}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Domain</dt>
            <dd className="mt-1 text-sm text-gray-900">{organization.domain || 'N/A'}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Subscription Plan</dt>
            <dd className="mt-1 text-sm text-gray-900">{organization.subscription_plan || 'N/A'}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}