"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeleteButton from "./ui/custom/DeleteButton";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

type Props = {
  url?: string;
  userId?: string;
  DialogTitle?: string;
  DialogDescription?: string;
  children?: React.ReactNode;
  onAction?: () => Promise<any>;
};

function CustomAlertDialog({
  DialogTitle = "Are You Absolutely Sure?",
  DialogDescription = "This will permanently delete your store data",
  url,
  children,
  userId,
  onAction,
}: Props) {
  const { storeId } = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setLoading(false);
  }, []);

  async function handleDelete() {
    try {
      setLoading(true);
      if (url) {
        const del = await fetch(url, {
          method: "DELETE",
          body: JSON.stringify({
            userId,
          }),
        });
        if (del.status === 200) {
          toast.success("Store Deleted!");
        }
      }
      router.refresh();
    } catch (error) {
      toast.error("Unable to Delete Store: " + error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <form action={onAction}>
      <AlertDialog open={open && loading} onOpenChange={setOpen}>
        <AlertDialogTrigger>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{DialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>{DialogDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              // @ts-ignore
              onClick={() => onAction()}
              disabled={loading}
              onSubmit={onAction}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}

export default CustomAlertDialog;
