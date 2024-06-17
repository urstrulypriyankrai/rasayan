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
import DeleteButton from "./ui/custom/DeleteButton";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { tree } from "next/dist/build/templates/app-page";

type Props = {
  url: string;
  userId: string;
  DialogTitile?: string;
  DialogDescription?: string;
};

function CustomAlertDialog({
  DialogTitile = "Are You Absolutely Sure?",
  DialogDescription = "This will permananetly delete you store data",
  url,
  userId,
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
      setOpen(true);
      setLoading(true);

      const del = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify({
          userId,
        }),
      });
      if (del.status === 200) {
        toast.success("Store Deleted !");
      }
      router.refresh();
    } catch (error) {
      toast.error("Unable to Delete Store" + error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <DeleteButton />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{DialogTitile}</AlertDialogTitle>
          <AlertDialogDescription>{DialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90"
            onClick={handleDelete}
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
