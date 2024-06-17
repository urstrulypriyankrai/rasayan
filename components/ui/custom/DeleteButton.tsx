import React from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: string;
};

const DeleteButton = ({
  className,
  variant = "destructive",
  ...otherProps
}: Props) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-10 h-10  rounded-sm border border-green p-0 bg-destructive text-destructive-foreground"
      )}
      {...otherProps}
    >
      <Trash />
    </div>
  );
};

export default DeleteButton;
