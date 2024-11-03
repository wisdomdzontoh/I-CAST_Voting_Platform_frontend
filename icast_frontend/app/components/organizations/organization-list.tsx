import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PlusCircle, Search } from "lucide-react";
import { listOrganizations } from "../../services/api"; // Adjust the path according to your project structure

interface Organization {
  id: string;
  name: string;
  organization_type: string;
  email: string;
  address: string;
  phone_number?: string;
  website?: string;
  logo?: string;
  status: "Active" | "Inactive";
}

export function OrganizationList({ onAdd, onEdit, onView }: {
  onAdd: () => void;
  onEdit: (org: Organization) => void;
  onView: (org: Organization) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const data = await listOrganizations();
        setOrganizations(data);
      } catch (err) {
        setError("Failed to load organizations.");
      } finally {
        setLoading(false);
      }
    };

    loadOrganizations();
  }, []);

  const filteredOrganizations = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.organization_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search organizations"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-[300px] border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <Button variant="primary" size="sm" onClick={onAdd}>
          <PlusCircle className="mr-2" /> Add Organization
        </Button>
      </div>
      {filteredOrganizations.length === 0 && (
        <p className="text-gray-500 mt-4">No organizations found.</p>
      )}
      {filteredOrganizations.map((org) => (
        <div key={org.id} className="flex justify-between items-center border-b border-gray-200 py-4 hover:bg-gray-100">
          <div className="flex items-center space-x-4">
            {org.logo ? (
              <img src={org.logo} alt={`${org.name} Logo`} className="h-10 w-10 rounded-full" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
                <p>No Logo</p>
              </div>
            )}
            <div>
              <h3 className="font-medium">{org.name}</h3>
              <p className="text-gray-500">{org.organization_type}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => onView(org)}>
              View
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onEdit(org)}>
              Edit
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}