import PageHeading from "@/components/PageHeading";
import CreateButton from "./_components/CreateButton";
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/BillboardColumns";
import { getBillBoards } from "@/lib/_cacheHooks/getBillBoards";
import Spinner from "@/components/ui/spinner";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

type Props = {
  params: {
    storeId: string;
  };
};

const Page = async ({ params }: Props) => {
  const category = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const filteredData = category.map((item) => {
    return {
      id: item.id,
      name: item.name,
    };
  });

  return (
    <>
      <PageHeading
        title={`Billboard (${category?.length})`}
        description="Create New Billboard"
        ButtonComponent={<CreateButton />}
      />
      <div className="md:mx-6 lg:mx-10 mx-1 mt-6">
        {/* @ts-ignore */}
        <DataTable columns={columns} data={category} />
      </div>
      <Spinner />
    </>
  );
};

export default Page;
