'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { PlusCircle, Edit, Eye } from "lucide-react"
import { OrganizationForm } from "../../components/organizations/organization-form"
import { OrganizationView } from "../../components/organizations/organization-view"
import { AddOrganizationModal } from "../../components/organizations/add-organization-modal"
import { EditOrganizationModal } from "../../components/organizations/edit-organization-modal"
import { ViewOrganizationModal } from "../../components/organizations/view-organization-modal"
import Header from '../../components/dashboard/header'
import Sidebar from '../../components/dashboard/sidebar'


export default function OrganizationPage() {
  const [activeTab, setActiveTab] = useState("details")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [organization, setOrganization] = useState(null)

  // Placeholder function to fetch organization data
  const fetchOrganization = async () => {
    // Implement API call to fetch organization data
    // For now, we'll use dummy data
    setOrganization({
      name: "Acme Inc.",
      organization_type: "Corporation",
      email: "contact@acme.com",
      address: "123 Main St, Anytown, USA",
      phone_number: "+1 (555) 123-4567",
      website: "https://www.acme.com",
      domain: "acme.com",
      logo: "/placeholder.svg?height=100&width=100",
      subscription_plan: "Premium"
    })
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
      <main className="flex-1 p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Organization Management</h1>
      <div className="flex justify-between mb-6">
        <Button onClick={() => setIsAddModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Organization
        </Button>
        <div>
          <Button variant="outline" onClick={() => setIsEditModalOpen(true)} className="mr-2">
            <Edit className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
          <Button variant="outline" onClick={() => setIsViewModalOpen(true)}>
            <Eye className="mr-2 h-4 w-4" /> View Profile
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Organization Details</TabsTrigger>
          <TabsTrigger value="form">Organization Form</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <OrganizationView organization={organization} />
        </TabsContent>
        <TabsContent value="form">
          <OrganizationForm organization={organization} onSubmit={(data) => console.log(data)} />
        </TabsContent>
      </Tabs>

      <AddOrganizationModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <EditOrganizationModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} organization={organization} />
      <ViewOrganizationModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} organization={organization} />
    </main>
    </div>
    </div>
  )
}