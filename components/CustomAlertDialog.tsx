"use client";
import React, { useEffect, useState } from "react";
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
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

type Props = {
  DialogTitle?: string;
  DialogDescription?: string;
  children?: React.ReactNode;
  setShowDialog?: boolean;
  onAction?: () => Promise<any>;
};

function CustomAlertDialog({
  DialogTitle = "Are You Absolutely Sure?",
  DialogDescription = "This will permanently delete your store data",
  children,
  setShowDialog = false,
  onAction,
}: Props) {
  const [open, setOpen] = useState(setShowDialog);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <AlertDialog open={open || loading} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{DialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{DialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90"
            onClick={async () => {
              setLoading(true);
              try {
                setLoading(true);
                await onAction?.();

                setOpen(false);
              } catch (error) {
                toast.error("Error deleting item");
              } finally {
                setLoading(false);
                setOpen(false);
              }
            }}
            disabled={loading}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomAlertDialog;
