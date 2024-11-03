// pages/dashboard/data.tsx
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  { id: "id", header: "ID", accessorKey: "id" },
  { id: "name", header: "Name", accessorKey: "name" },
  { id: "status", header: "Status", accessorKey: "status" },
  { id: "created_at", header: "Created At", accessorKey: "created_at" },
];

export const data = [
  { id: 1, name: "Session 1", status: "Active", created_at: "2024-11-01" },
  { id: 2, name: "Session 2", status: "Inactive", created_at: "2024-11-02" },
  { id: 3, name: "Session 3", status: "Completed", created_at: "2024-11-03" },
];
