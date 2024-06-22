import React from "react";
import { Button } from "./ui/button";
import { Plus, Trash } from "lucide-react";
import { Separator } from "./ui/separator";

type Props = {
  title: string;
  description: string;
  ActionButton?: JSX.Element | any;
};

const PageHeading = ({
  title,
  description,
  ActionButton = () => null,
}: Props) => {
  return (
    <>
      <div className="flex flex-col justify-center px-2 md:px-6 lg:px-10">
        <div className="flex items-center  my-1 md:my-1.5 justify-between">
          <div className=" flex flex-col">
            <h1 className="text-3xl tracking-tight font-bold">{title}</h1>
            <span>{description}</span>
          </div>
          {/* ActionButton */}
          <ActionButton />
        </div>
        <Separator />
      </div>
    </>
  );
};

export default PageHeading;
