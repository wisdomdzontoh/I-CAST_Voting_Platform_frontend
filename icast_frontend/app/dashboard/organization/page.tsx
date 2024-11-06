// pages/OrganizationPage.tsx
"use client";
import { useEffect, useState } from 'react'
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
import apiService from '../../services/api'  // import your apiService

export default function OrganizationPage() {
  const [activeTab, setActiveTab] = useState("details")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [organization, setOrganization] = useState(null)

  const fetchOrganization = async () => {
    try {
      const org = await apiService.getOrganization(1) // Replace with dynamic ID as needed
      setOrganization(org)
    } catch (error) {
      console.error("Failed to fetch organization:", error)
    }
  }

  useEffect(() => {
    fetchOrganization()
  }, [])

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
