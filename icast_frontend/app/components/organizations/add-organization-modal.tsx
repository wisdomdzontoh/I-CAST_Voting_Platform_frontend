import apiService from "@/app/services/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { OrganizationForm } from "./organization-form"

export function AddOrganizationModal({ isOpen, onClose }) {
  const handleAddOrganization = async (data) => {
    try {
      await apiService.createOrganization(data)
      onClose()
      // Refresh the organization list or data after adding
    } catch (error) {
      console.error("Failed to add organization:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Add New Organization</DialogTitle>
        </DialogHeader>
        <OrganizationForm onSubmit={handleAddOrganization} />
      </DialogContent>
    </Dialog>
  );
}