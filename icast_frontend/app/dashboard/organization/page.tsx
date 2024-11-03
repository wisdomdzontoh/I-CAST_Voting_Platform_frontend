"use client"

import { useState } from 'react'
import { OrganizationList } from '../../components/organizations/organization-list'
import { OrganizationForm } from '../../components/organizations/organization-form'
import { OrganizationProfile } from '../../components/organizations/organization-profile'
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Sidebar } from "../../components/dashboard/sidebar"
import { Header } from "../../components/dashboard/header"
import { PlusCircle } from 'lucide-react'

interface Organization {
  id: string
  name: string
  type: string
  members: number
  status: 'Active' | 'Inactive'
}

export default function OrganizationsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null)

  const handleAdd = () => {
    setIsAddModalOpen(true)
  }

  const handleEdit = (org: Organization) => {
    setSelectedOrganization(org)
    setIsEditModalOpen(true)
  }

  const handleView = (org: Organization) => {
    setSelectedOrganization(org)
    setIsViewModalOpen(true)
  }

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data)
    setIsAddModalOpen(false)
    setIsEditModalOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900">Organizations</h1>
            <Button onClick={handleAdd} className="bg-blue-600 text-white hover:bg-blue-700 transition duration-200">
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Organization
            </Button>
          </div>

          <Tabs defaultValue="list" className="space-y-6">
            <TabsList className="bg-white shadow-md rounded-lg">
              <TabsTrigger value="list" className="data-[state=active]:bg-gray-200 rounded-lg px-4 py-2">Organization List</TabsTrigger>
              <TabsTrigger value="stats" className="data-[state=active]:bg-gray-200 rounded-lg px-4 py-2">Organization Stats</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <Card className="shadow-lg rounded-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Manage Organizations</CardTitle>
                  <CardDescription>View, add, and edit organizations in the system.</CardDescription>
                </CardHeader>
                <CardContent>
                  <OrganizationList onAdd={handleAdd} onEdit={handleEdit} onView={handleView} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <Card className="shadow-lg rounded-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Organization Statistics</CardTitle>
                  <CardDescription>Overview of organization data and metrics.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard title="Total Organizations" value="250" />
                    <StatCard title="Active Organizations" value="200" />
                    <StatCard title="Inactive Organizations" value="50" />
                    <StatCard title="Total Members" value="10,000+" />
                    <StatCard title="Average Members per Org" value="40" />
                    <StatCard title="Organizations Added This Month" value="15" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogContent className="sm:max-w-[768px]">
              <DialogHeader>
                <DialogTitle>Add New Organization</DialogTitle>
                <DialogDescription>Enter the details for the new organization.</DialogDescription>
              </DialogHeader>
              <OrganizationForm onSubmit={handleSubmit} onCancel={() => setIsAddModalOpen(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-[768px]">
              <DialogHeader>
                <DialogTitle>Edit Organization</DialogTitle>
                <DialogDescription>Update the organization details.</DialogDescription>
              </DialogHeader>
              {selectedOrganization && (
                <OrganizationForm
                  organization={selectedOrganization}
                  onSubmit={handleSubmit}
                  onCancel={() => setIsEditModalOpen(false)}
                />
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="sm:max-w-[768px]">
              <DialogHeader>
                <DialogTitle>Organization Profile</DialogTitle>
              </DialogHeader>
              {selectedOrganization && (
                <OrganizationProfile
                  organization={selectedOrganization}
                  onClose={() => setIsViewModalOpen(false)}
                />
              )}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="shadow-md rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
      </CardContent>
    </Card>
  )
}
