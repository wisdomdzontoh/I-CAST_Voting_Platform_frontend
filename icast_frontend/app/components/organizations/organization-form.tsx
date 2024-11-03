import { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { cn } from "@/lib/utils";
import { fetchSubscriptionPlans } from '../../services/api'; // Adjust import based on your structure

interface OrganizationFormProps {
  organization?: {
    id: string;
    name: string;
    organization_type: string;
    email: string;
    address: string;
    phone_number: string;
    website: string;
    domain: string;
    logo?: string; // Optional for editing
    subscription_plan: string | null;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function OrganizationForm({ organization, onSubmit, onCancel }: OrganizationFormProps) {
  const [formData, setFormData] = useState(() => ({
    name: '',
    organization_type: '',
    email: '',
    address: '',
    phone_number: '',
    website: '',
    domain: '',
    logo: null,
    subscription_plan: ''
  }));

  const [subscriptionPlans, setSubscriptionPlans] = useState<{ id: string; name: string }[]>([]);

  // Set form data for editing if organization is provided
  useEffect(() => {
    if (organization) {
      setFormData({
        id: organization.id,
        name: organization.name,
        organization_type: organization.organization_type,
        email: organization.email,
        address: organization.address,
        phone_number: organization.phone_number,
        website: organization.website,
        domain: organization.domain,
        logo: organization.logo || null,
        subscription_plan: organization.subscription_plan || ''
      });
    }
  }, [organization]);

  // Fetch subscription plans when component mounts
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plans = await fetchSubscriptionPlans(); // Use the new function
        setSubscriptionPlans(plans);
      } catch (error) {
        console.error('Error fetching subscription plans:', error);
      }
    };
    fetchPlans();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, logo: e.target.files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    onSubmit(submitData);
  };

  const FormField = ({ name, label, type = "text", ...props }: { name: string; label: string; type?: string; [key: string]: any }) => (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} value={formData[name]} onChange={handleChange} {...props} />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField name="name" label="Organization Name" required />
        
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="organization_type">Type</Label>
          <Select name="organization_type" value={formData.organization_type} onValueChange={(value) => setFormData(prev => ({ ...prev, organization_type: value }))}>
            <SelectTrigger id="organization_type">
              <SelectValue placeholder="Select organization type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Corporation">Corporation</SelectItem>
              <SelectItem value="Educational">Educational</SelectItem>
              <SelectItem value="Non-Profit">Non-Profit</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <FormField name="email" label="Email" type="email" required />
        <FormField name="address" label="Address" required />
        <FormField name="phone_number" label="Phone Number" />
        <FormField name="website" label="Website" type="url" />
        <FormField name="domain" label="Domain" type="url" />

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="logo">Logo</Label>
          <Input id="logo" name="logo" type="file" onChange={handleFileChange} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="subscription_plan">Subscription Plan</Label>
          <Select name="subscription_plan" value={formData.subscription_plan} onValueChange={(value) => setFormData(prev => ({ ...prev, subscription_plan: value }))}>
            <SelectTrigger id="subscription_plan">
              <SelectValue placeholder="Select subscription plan" />
            </SelectTrigger>
            <SelectContent>
              {subscriptionPlans.map(plan => (
                <SelectItem key={plan.id} value={plan.id}>{plan.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
