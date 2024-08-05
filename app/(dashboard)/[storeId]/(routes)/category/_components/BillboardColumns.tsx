"use client";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

type Billboard = {
  id: string;
  label: string;
  imageUrl: string;
  createdAt: string;
  onDelete: () => null;
  onClick: () => null;
};

export const columns: ColumnDef<Billboard>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "action",
    cell: ({ row }) => {
      const billboard = row.original;

      return <CellAction billboard={billboard} />;
    },
    header: "Action",
  },
];
