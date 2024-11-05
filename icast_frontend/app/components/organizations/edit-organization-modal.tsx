import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { OrganizationForm } from "./organization-form"

export function EditOrganizationModal({ isOpen, onClose, organization }) {
  const handleSubmit = (data) => {
    console.log("Updating organization:", data);
    // Implement API call to update organization
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Edit Organization</DialogTitle>
        </DialogHeader>
        <OrganizationForm onSubmit={handleSubmit} initialData={organization} />
      </DialogContent>
    </Dialog>
  );
}