"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { toNamespacedPath } from "path/win32";
type Props = {
  title: string;
  description?: string;
  variant: "Public" | "Admin";
};

const textMap: Record<Props["variant"], string> = {
  Public: "Public",
  Admin: "Admin",
};
const variantMap: Record<Props["variant"], BadgeProps["variant"]> = {
  Public: "secondary",
  Admin: "destructive",
};

function ApiUrlCard({ title, description, variant }: Props) {
  const newDescription = window.location.origin + "/" + description;
  const onCopy = () => {
    navigator.clipboard.writeText(newDescription);
    toast.success("Copied !");
  };
  return (
    <Alert className="rounded-sm mt-2 px-2">
      <Server className="h-4 w-4 " />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <code className="relative rounded font-semibold text-sm font-mono bg-muted px-[0.2rem] py-[0.1rem]">
          {newDescription}
        </code>
        <Button onClick={onCopy}>
          <Copy />
        </Button>
      </AlertDescription>
    </Alert>
  );
}

export default ApiUrlCard;
