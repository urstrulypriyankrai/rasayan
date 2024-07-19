"use client";

import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
type Props = {
  url?: string;
};

export default function CreateButton(props: Props) {
  const router = useRouter();
  const params = useParams();
  async function handleDelete() {
    console.log('handle delete called')
  }
  return (
    <Button
      variant={"destructive"}
      className="p-2 md:p-4"
      onClick={handleDelete}
    >
      <Trash className="mr-2 h-4 w-4" />
    </Button>
  );
}
