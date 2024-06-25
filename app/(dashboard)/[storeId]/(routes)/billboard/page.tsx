import PageHeading from "@/components/PageHeading";
import CreateButton from "./_components/CreateButton";
import React from "react";
import prismadb from "@/lib/prismadb";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/BillboardColumns";
import { format } from "date-fns";
type Props = {
  params: {
    storeId: string;
  };
};

const Page = async ({ params }: Props) => {
  const billboard = await prismadb.billBoard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const filteredData = billboard.map((item) => {
    return {
      id: item.id,
      label: item.label,
      imageUrl: item.imageUrl,
      createdAt: format(new Date(item.updateAt), "do MMM, yyyy"),
    };
  });

  return (
    <>
      <PageHeading
        title={`Billboard (${billboard.length})`}
        description="Create New Billboard"
        ButtonComponent={<CreateButton />}
      />
      <div className="md:mx-6 lg:mx-10 mx-1 mt-6">
        <DataTable columns={columns} data={filteredData} />
      </div>
    </>
  );
};

export default Page;
