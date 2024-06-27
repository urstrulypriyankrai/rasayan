import CustomAlertDialog from "@/components/CustomAlertDialog";
import { Separator } from "@/components/ui/separator";
import { getUserId } from "@/lib/getUserId";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import React from "react";
import SettingForm from "./_components/SettingForm";
import ApiUrlCard from "@/components/ApiUrlCard";

type Props = {
  params: {
    storeId: string;
  };
};

async function SettingPage({ params }: Props) {
  const userId = getUserId();
  const store = await prismadb.store.findFirst({
    where: {
      userId,
      id: params.storeId,
    },
  });
  if (!store) redirect("/");

  return (
    <div className="flex flex-col justify-center px-2 md:px-6 lg:px-10">
      <Heading
        title={"Setting"}
        description="Manage Store Prefrences"
        storeId={params.storeId}
      />
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6 bg-card">
        <div className="">
          <SettingForm name={store.name} />
        </div>
      </div>
      <Separator />
      <ApiUrlCard
        title="NEXT_PUBLIC_API_URL"
        description={`${params.storeId}`}
        variant="Admin"
      />
    </div>
  );
}

export default SettingPage;

const Heading = ({
  title,
  description,
  storeId,
}: {
  title: string;
  description: string;
  storeId: string;
}) => {
  const userId = getUserId();
  return (
    <div className="flex items-center  my-1 md:my-1.5 justify-between">
      <div className=" flex flex-col">
        <h1 className="text-3xl tracking-tight font-bold">{title}</h1>
        <span>{description}</span>
      </div>
      <CustomAlertDialog url={`/api/store/${storeId}`} userId={userId} />
    </div>
  );
};
