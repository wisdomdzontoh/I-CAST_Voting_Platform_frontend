import apiService from "@/app/services/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { OrganizationForm } from "./organization-form"

export function EditOrganizationModal({ isOpen, onClose, organization }) {
  const handleEditOrganization = async (data) => {
    try {
      await apiService.updateOrganization(organization.id, data)
      onClose()
    } catch (error) {
      console.error("Failed to edit organization:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose} title="Edit Organization">
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Edit Organization</DialogTitle>
        </DialogHeader>
        <OrganizationForm onSubmit={handleEditOrganization} initialData={organization} />
      </DialogContent>
    </Dialog>
  );
}