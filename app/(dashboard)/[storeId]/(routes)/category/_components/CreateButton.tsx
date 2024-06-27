"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
type Props = {
  url?: string;
};

export default function CreateButton(props: Props) {
  const router = useRouter();
  const params = useParams();
  async function handleClick() {
    router.push(`/${params.storeId}/billboard/new`);
  }
  return (
    <Button variant={"default"} className="p-2 md:p-4" onClick={handleClick}>
      <Plus className="mr-2 h-4 w-4" />
      Add New
    </Button>
  );
}
