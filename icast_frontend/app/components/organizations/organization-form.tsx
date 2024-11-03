import { useState } from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { cn } from "@/lib/utils"

interface OrganizationFormProps {
  organization?: {
    id: string
    name: string
    type: string
    email: string
    address: string
    phone_number: string
    website: string
    domain: string
    logo: string
    subscription_plan: string
    members?: number
    status?: 'Active' | 'Inactive'
  }
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function OrganizationForm({ organization, onSubmit, onCancel }: OrganizationFormProps) {
  const [formData, setFormData] = useState(organization || {
    name: '',
    type: '',
    email: '',
    address: '',
    phone_number: '',
    website: '',
    domain: '',
    logo: '',
    subscription_plan: '',
    members: 0,
    status: 'Active'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const FormField = ({ name, label, type = "text", ...props }: { name: string; label: string; type?: string; [key: string]: any }) => (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} value={formData[name]} onChange={handleChange} {...props} />
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField name="name" label="Organization Name" required />
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="type">Type</Label>
          <Select name="type" value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
            <SelectTrigger id="type">
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
          <Input id="logo" name="logo" type="file" onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.files[0] }))} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
        </div>
        <FormField name="subscription_plan" label="Subscription Plan" />
        <FormField name="members" label="Number of Members" type="number" required />
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">Status</Label>
          <Select name="status" value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as 'Active' | 'Inactive' }))}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}