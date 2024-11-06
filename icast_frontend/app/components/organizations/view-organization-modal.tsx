import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { OrganizationView } from "./organization-view"

export function ViewOrganizationModal({ isOpen, onClose, organization }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} title="View Organization">
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Organization Profile</DialogTitle>
        </DialogHeader>
        <OrganizationView organization={organization} />
      </DialogContent>
    </Dialog>
  )
}