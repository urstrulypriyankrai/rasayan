import PageHeading from "@/components/PageHeading";
import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/BillboardColumns";
import prismadb from "@/lib/prismadb";
import CreateCategoryForm from "./_components/CreateCategoryForm";

type Props = {
  params: {
    storeId: string;
  };
};

const Page = async ({ params }: Props) => {
  const allCategories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    select: {
      billboard: {
        select: {
          label: true,
        },
      },
    },
  });

  return (
    <>
      <CreateCategoryForm category={null} />

      <PageHeading
        title={`All Categories (${allCategories?.length})`}
        description="Create a New Category"
        ButtonComponent={null}
      />
      <div className="md:mx-6 lg:mx-10 mx-1 mt-6">
        {/* @ts-ignore */}
        <DataTable columns={columns} data={allCategories} />
      </div>
    </>
  );
};

export default Page;
