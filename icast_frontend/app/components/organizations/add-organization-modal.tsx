import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { OrganizationForm } from "./organization-form"

export function AddOrganizationModal({ isOpen, onClose }) {
  const handleSubmit = (data) => {
    console.log("Adding organization:", data);
    // Implement API call to add organization
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Add New Organization</DialogTitle>
        </DialogHeader>
        <OrganizationForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}