"use client";
import CustomAlertDialog from "@/components/CustomAlertDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Spinner from "@/components/ui/spinner";
import { CopyIcon, Edit, MoreHorizontal, Trash } from "lucide-react";
import { revalidatePath, revalidateTag } from "next/cache";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import toast from "react-hot-toast";
import { handleDelete } from "../_serverActions";
export default function CellAction({
  billboard,
}: {
  billboard: {
    id: string;
    onClick: () => null;
  };
}) {
  const { storeId } = useParams();
  let updatedHandleDelete = handleDelete
    // @ts-ignore
    .bind(null, storeId.toString(), billboard.id);
  // @ts-ignore

  return (
    <Suspense fallback={<Spinner />}>
      <CustomAlertDialog
        DialogTitle="Are you sure ?"
        DialogDescription="do you want to delete billboard permanently"
        onAction={updatedHandleDelete}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="h-8 w-8 p-0 grid place-items-center rounded-md border border-input ">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(billboard.id)}
              className="space-x-2"
            >
              <CopyIcon />
              <span>Copy ID</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => billboard.onClick()}
              className="space-x-2"
            >
              <Edit />
              <span>Update</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="space-x-2">
              <Trash />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CustomAlertDialog>
    </Suspense>
  );
}
