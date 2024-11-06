import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { VotingSessionForm } from "../voting-session/voting-session-form"
import { useToast } from "../../components/ui/use-toast"

interface VotingSessionModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "add" | "edit"
  initialData?: VotingSession
}

export function VotingSessionModal({ isOpen, onClose, mode, initialData }: VotingSessionModalProps) {
  const { toast } = useToast()

  const handleSubmit = async (data: VotingSession) => {
    try {
      // TODO: Implement API call to add or edit voting session
      toast({
        title: `Voting Session ${mode === "add" ? "Added" : "Updated"}`,
        description: "The voting session has been successfully saved.",
      })
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the voting session.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Voting Session" : "Edit Voting Session"}</DialogTitle>
        </DialogHeader>
        <VotingSessionForm onSubmit={handleSubmit} initialData={initialData} />
      </DialogContent>
    </Dialog>
  )
}