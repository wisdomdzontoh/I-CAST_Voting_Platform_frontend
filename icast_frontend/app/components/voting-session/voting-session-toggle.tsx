import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group"

interface VotingSessionToggleProps {
  activeFilter: "active" | "all" | "expired"
  setActiveFilter: (filter: "active" | "all" | "expired") => void
}

export function VotingSessionToggle({ activeFilter, setActiveFilter }: VotingSessionToggleProps) {
  return (
    <ToggleGroup type="single" value={activeFilter} onValueChange={(value) => setActiveFilter(value as "active" | "all" | "expired")}>
      <ToggleGroupItem value="active" aria-label="Show active sessions">
        Active
      </ToggleGroupItem>
      <ToggleGroupItem value="all" aria-label="Show all sessions">
        All
      </ToggleGroupItem>
      <ToggleGroupItem value="expired" aria-label="Show expired sessions">
        Expired
      </ToggleGroupItem>
    </ToggleGroup>
  )
}