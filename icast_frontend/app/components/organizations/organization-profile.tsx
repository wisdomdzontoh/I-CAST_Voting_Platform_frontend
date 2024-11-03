import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Users, Building, Activity, Mail, Phone, Globe, Tag } from 'lucide-react';

interface OrganizationProfileProps {
  organization: {
    id: string;
    name: string;
    organization_type: string;
    members: number;
    status: 'Active' | 'Inactive';
    email: string;
    address: string;
    phone_number: string;
    website: string;
    domain: string;
    logo: string;
    subscription_plan: number | null;
  };
  onClose: () => void;
}

// Map of subscription plan IDs to plan names
const subscriptionPlanNames: { [key: number]: string } = {
  1: "Basic Plan",
  2: "Premium Plan",
  3: "Enterprise Plan",
};

export function OrganizationProfile({ organization, onClose }: OrganizationProfileProps) {
  const subscriptionPlanName = organization.subscription_plan
    ? subscriptionPlanNames[organization.subscription_plan]
    : "None";

  return (
    <Card>
      <CardHeader>
      {organization.logo && (
          <img
            src={organization.logo}
            alt={`${organization.name} logo`}
            className="w-24 h-24 object-cover rounded-full border border-gray-300 mb-4"
          />
        )}
        <CardTitle>{organization.name}</CardTitle>
        <CardDescription>{organization.organization_type} Organization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          <span>{organization.members} Members</span>
        </div>
        <div className="flex items-center">
          <Building className="mr-2 h-4 w-4" />
          <span>{organization.organization_type}</span>
        </div>
        <div className="flex items-center">
          <Activity className="mr-2 h-4 w-4" />
          <span>Status: {organization.status}</span>
        </div>
        <div className="flex items-center">
          <Mail className="mr-2 h-4 w-4" />
          <span>Email: {organization.email}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 h-4 w-4">📍</span>
          <span>Address: {organization.address}</span>
        </div>
        <div className="flex items-center">
          <Phone className="mr-2 h-4 w-4" />
          <span>Phone: {organization.phone_number}</span>
        </div>
        <div className="flex items-center">
          <Globe className="mr-2 h-4 w-4" />
          <span>Website: <a href={organization.website} target="_blank" rel="noopener noreferrer">{organization.website}</a></span>
        </div>
        <div className="flex items-center">
          <Tag className="mr-2 h-4 w-4" />
          <span>Domain: {organization.domain}</span>
        </div>
        <div className="flex items-center">
          <span>Subscription Plan: {subscriptionPlanName}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onClose}>Close</Button>
      </CardFooter>
    </Card>
  );
}
