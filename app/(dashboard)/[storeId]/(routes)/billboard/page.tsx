import PageHeading from "@/components/PageHeading";
import CreateButton from "./_components/CreateButton";
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/BillboardColumns";
import { getBillBoards } from "@/lib/_cacheHooks/getBillBoards";

type Props = {
  params: {
    storeId: string;
  };
};

const Page = async ({ params }: Props) => {
  const billboard = await getBillBoards(params.storeId);
  if (billboard)
    return (
      <>
        <PageHeading
          title={`Billboard (${billboard.length})`}
          description="Create New Billboard"
          ButtonComponent={<CreateButton />}
        />
        <div className="md:mx-6 lg:mx-10 mx-1 mt-6">
          {/* @ts-ignore */}
          <DataTable columns={columns} data={billboard} />
        </div>
      </>
    );
};

export default Page;
