"use client";
import CustomAlertDialog from "@/components/CustomAlertDialog";
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
import { useParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
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
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const updatedHandleDelete = async () => {
    try {
      await handleDelete(storeId.toString(), billboard.id);
      toast.success("Deleted Successfully");
      router.refresh(); // Refresh or redirect as needed
    } catch (error) {
      toast.error("Error deleting item");
    }
  };

  return (
    <Suspense fallback={<Spinner />}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="h-8 w-8 p-0 grid place-items-center rounded-md border border-input">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(billboard.id);
              toast.success("ID copied to clipboard");
            }}
            className="space-x-2"
          >
            <CopyIcon />
            <span>Copy ID</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              router.push(`/${storeId}/billboard/${billboard.id}`);
            }}
            className="space-x-2"
          >
            <Edit />
            <span>Update</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="space-x-2"
            onClick={() => setShowDialog(true)}
          >
            <Trash />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showDialog && (
        <CustomAlertDialog
          DialogTitle="Are you sure?"
          DialogDescription="Do you want to delete the billboard permanently?"
          onAction={updatedHandleDelete}
          setShowDialog={showDialog}
        >
          {/* You can pass any trigger element here */}
        </CustomAlertDialog>
      )}
    </Suspense>
  );
}
