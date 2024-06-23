import PageHeading from "@/components/PageHeading";
import CreateButton from "./_components/CreateButton";
import React from "react";

type Props = {
  params: any;
};

const Page = (props: Props) => {


  return (
    <>
      <PageHeading
        title="Billboard (0)"
        description="Create New Billboard"
        ButtonComponent={<CreateButton />}
      />
    </>
  );
};

export default Page;
