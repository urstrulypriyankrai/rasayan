import CustomAlertDialog from "@/components/CustomAlertDialog";
import { getUserId } from "@/lib/getUserId";
import prismadb from "@/lib/prismadb";
import { redirect, useParams } from "next/navigation";
import React, { Suspense } from "react";

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
    },
  });
  if (!store) redirect("/");

  return (
    <div className="flex flex-col">
      <Heading
        title={"Setting"}
        description="Manage Store Prefrences"
        storeId={params.storeId}
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
    <div className="flex items-center px-2 md:px-6 lg:px-10 mt-2 md:mt-3 justify-between">
      <div className=" flex flex-col">
        <h1 className="text-3xl tracking-tight font-bold">{title}</h1>
        <span>{description}</span>
      </div>
      <Suspense fallback={<span>loading....</span>}>
        <CustomAlertDialog url={`/api/store/${storeId}`} userId={userId} />
      </Suspense>
    </div>
  );
};
