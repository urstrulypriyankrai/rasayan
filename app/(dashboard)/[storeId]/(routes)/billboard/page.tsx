import PageHeading from "@/components/PageHeading";
import CreateButton from "./_components/CreateButton";
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/BillboardColumns";
import { getBillBoards } from "@/lib/_cacheHooks/getBillBoards";
import Spinner, { FullPageSpinner } from "@/components/ui/spinner";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

type Props = {
  params: {
    storeId: string;
  };
};

const Page = async ({ params }: Props) => {
  const category = await prismadb.billBoard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const filteredData = category.map((item) => {
    return {
      id: item.id,
      label: item.label,
      createdAt: format(item.createdAt, "do MMM, yyyy"),
    };
  });

  return (
    <>
      <PageHeading
        title={`Billboard (${filteredData?.length})`}
        description="Create New Billboard"
        ButtonComponent={<CreateButton />}
      />
      <div className="md:mx-6 lg:mx-10 mx-1 mt-6">
        {/* @ts-ignore */}
        <DataTable columns={columns} data={filteredData} />
      </div>
      <FullPageSpinner />
    </>
  );
};

export default Page;
