"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Button } from "../../components/ui/button"
import { EditIcon, TrashIcon } from "lucide-react"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/paginator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Switch } from "../../components/ui/switch"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { DateTimePicker } from "../../components/ui/date-time-picker"

interface VotingSession {
  id: string
  session_title: string
  description: string
  start_date: string
  end_date: string
  is_active: boolean
  allow_anonymous_voting: boolean
}

interface VotingSessionListProps {
  filter: "active" | "all" | "expired"
  searchQuery: string
}

const ITEMS_PER_PAGE = 5

export function VotingSessionList({ filter, searchQuery }: VotingSessionListProps) {
  const [sessions, setSessions] = useState<VotingSession[]>([
    { id: "1", session_title: "Board Election 2024", description: "Annual board member election", start_date: "2024-01-01", end_date: "2024-01-31", is_active: true, allow_anonymous_voting: false },
    { id: "2", session_title: "Budget Approval", description: "Approve the annual budget", start_date: "2023-12-01", end_date: "2023-12-15", is_active: false, allow_anonymous_voting: false },
    { id: "3", session_title: "Policy Changes", description: "Vote on proposed policy changes", start_date: "2024-02-01", end_date: "2024-02-15", is_active: true, allow_anonymous_voting: true },
    { id: "4", session_title: "New Project Initiative", description: "Vote on new project proposals", start_date: "2024-03-01", end_date: "2024-03-15", is_active: false, allow_anonymous_voting: true },
    { id: "5", session_title: "Committee Formation", description: "Select members for new committees", start_date: "2024-04-01", end_date: "2024-04-30", is_active: true, allow_anonymous_voting: false },
    { id: "6", session_title: "Annual General Meeting", description: "Vote on AGM resolutions", start_date: "2024-05-15", end_date: "2024-05-16", is_active: false, allow_anonymous_voting: false },
    { id: "7", session_title: "Strategic Plan Approval", description: "Approve the 5-year strategic plan", start_date: "2024-06-01", end_date: "2024-06-30", is_active: true, allow_anonymous_voting: true },
  ])

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<VotingSession | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredSessions = sessions.filter((session) => {
    const now = new Date()
    const startDate = new Date(session.start_date)
    const endDate = new Date(session.end_date)

    const matchesFilter = 
      (filter === "active" && session.is_active && now >= startDate && now <= endDate) ||
      (filter === "expired" && now > endDate) ||
      (filter === "all")

    const matchesSearch = session.session_title.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const totalPages = Math.ceil(filteredSessions.length / ITEMS_PER_PAGE)
  const paginatedSessions = filteredSessions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleEdit = (session: VotingSession) => {
    setSelectedSession(session)
    setEditModalOpen(true)
  }

  const handleDelete = (session: VotingSession) => {
    setSelectedSession(session)
    setDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (selectedSession) {
      setSessions(sessions.filter((s) => s.id !== selectedSession.id))
      setDeleteModalOpen(false)
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Session Title</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedSessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell>{session.session_title}</TableCell>
              <TableCell>{new Date(session.start_date).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(session.end_date).toLocaleDateString()}</TableCell>
              <TableCell>{session.is_active ? "Active" : "Inactive"}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => handleEdit(session)}>
                  <EditIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(session)}>
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => setCurrentPage(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <VotingSessionModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        mode="edit"
        initialData={selectedSession}
        onSubmit={(updatedSession) => {
          setSessions(sessions.map(s => s.id === updatedSession.id ? updatedSession : s))
          setEditModalOpen(false)
        }}
      />

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={selectedSession?.session_title || ""}
      />
    </>
  )
}

function VotingSessionModal({ isOpen, onClose, mode, initialData, onSubmit }: {
  isOpen: boolean
  onClose: () => void
  mode: "add" | "edit"
  initialData?: VotingSession
  onSubmit: (data: VotingSession) => void
}) {
  const formSchema = z.object({
    id: z.string().optional(),
    session_title: z.string().min(2, "Title must be at least 2 characters."),
    description: z.string().optional(),
    start_date: z.date(),
    end_date: z.date(),
    is_active: z.boolean(),
    allow_anonymous_voting: z.boolean(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      session_title: "",
      description: "",
      start_date: new Date(),
      end_date: new Date(),
      is_active: false,
      allow_anonymous_voting: false,
    },
  })

  function onFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values as VotingSession)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Voting Session" : "Edit Voting Session"}</DialogTitle>
          <DialogDescription>
            {mode === "add" ? "Create a new voting session here." : "Make changes to the voting session here."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="session_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter session title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter session description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <DateTimePicker
                    date={field.value}
                    setDate={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <DateTimePicker
                    date={field.value}
                    setDate={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active</FormLabel>
                    <FormDescription>
                      Set the voting session as active or inactive
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allow_anonymous_voting"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Allow Anonymous Voting</FormLabel>
                    <FormDescription>
                      Enable or disable anonymous voting for this session
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, itemName }: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  itemName: string
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this voting session?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the voting session "{itemName}" and remove all associated data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}