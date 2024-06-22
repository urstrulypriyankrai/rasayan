import PageHeading from "@/components/PageHeading";
import CreateButton from "./_components/CreateButton";
import React from "react";

type Props = {
  params: any;
};

const Page = (props: Props) => {
  console.log(props.params);

  return (
    <>
      <PageHeading
        title="Billboard (0)"
        description="Create New Billboard"
        ActionButton={CreateButton}
      />
    </>
  );
};

export default Page;
