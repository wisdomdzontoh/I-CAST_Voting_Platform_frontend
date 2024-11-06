import { useState } from "react"
import { Button } from "../../components/ui/button"
import { PlusIcon } from "lucide-react"
import { VotingSessionModal } from "../voting-session/voting-session-modal"

export function AddVotingSessionButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <PlusIcon className="mr-2 h-4 w-4" /> Add Voting Session
      </Button>
      <VotingSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="add"
      />
    </>
  )
}